const form = document.querySelector("#noteForm");
const output = document.querySelector("#noteOutput");
const statusMessage = document.querySelector("#statusMessage");
const copyButton = document.querySelector("#copyButton");
const clearButton = document.querySelector("#clearButton");
const demoButton = document.querySelector("#demoButton");
const interactionType = document.querySelector("#interactionType");
const interactionGuidance = document.querySelector("#interactionGuidance");
const reviewed = document.querySelector("#reviewed");
const reviewedHint = document.querySelector("#reviewedHint");

let generatedNote = "";
let outputIsStale = false;

const guidanceByType = {
  "Account access": "Capture the access problem, troubleshooting completed, and final status.",
  "Billing question": "Summarize the charge or billing concern without entering payment-card information.",
  "Technical issue": "Record the symptom, environment, troubleshooting steps, and observed result.",
  "Eligibility or policy question": "State the question, the general information provided, and any next step.",
  "General inquiry": "Capture the customer’s goal, the information provided, and the outcome."
};

const requiredFields = [
  ["customerGoal", "Enter the customer’s goal."],
  ["issueSummary", "Enter an issue summary."],
  ["actionsTaken", "Enter the actions taken."],
  ["outcome", "Select an outcome."],
  ["disposition", "Select a disposition."]
];

function normalize(value) {
  return value.trim().replace(/\s+/g, " ");
}

function setError(fieldId, message) {
  const field = document.querySelector(`#${fieldId}`);
  const error = document.querySelector(`#${fieldId}Error`);
  field.setAttribute("aria-invalid", message ? "true" : "false");
  error.textContent = message;
}

function validate() {
  let valid = true;

  for (const [fieldId, message] of requiredFields) {
    const field = document.querySelector(`#${fieldId}`);
    const missing = !normalize(field.value);
    setError(fieldId, missing ? message : "");
    valid = valid && !missing;
  }

  return valid;
}

function buildNote() {
  const data = new FormData(form);
  const sections = [
    ["CHANNEL", data.get("channel")],
    ["CONTACT REASON", `${data.get("interactionType")} — ${normalize(data.get("customerGoal"))}`],
    ["VERIFICATION", data.get("verification")],
    ["ISSUE", normalize(data.get("issueSummary"))],
    ["ACTIONS", normalize(data.get("actionsTaken"))],
    ["OUTCOME", data.get("outcome")],
    ["FOLLOW-UP", normalize(data.get("followUp"))],
    ["DISPOSITION", data.get("disposition")]
  ];

  return sections
    .filter(([, value]) => value)
    .map(([heading, value]) => `${heading}:\n${value}`)
    .join("\n\n");
}

function updateCopyGate() {
  copyButton.disabled = !generatedNote || outputIsStale || !reviewed.checked;
}

function resetReviewGate() {
  reviewed.checked = false;
  reviewed.disabled = true;
  reviewedHint.textContent = "Generate a note before confirming your review.";
  updateCopyGate();
}

function markStale() {
  if (!generatedNote || outputIsStale) return;

  outputIsStale = true;
  reviewed.checked = false;
  reviewed.disabled = true;
  reviewedHint.textContent = "Generate the updated note before confirming your review.";
  updateCopyGate();
  statusMessage.textContent = "Inputs changed. Generate the note again before reviewing or copying.";
  statusMessage.classList.add("stale");
}

function resetStatus() {
  statusMessage.textContent = "";
  statusMessage.classList.remove("stale");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const succeeded = document.execCommand("copy");
  helper.remove();

  if (!succeeded) {
    throw new Error("Copy command was not available.");
  }
}

interactionType.addEventListener("change", () => {
  interactionGuidance.textContent = guidanceByType[interactionType.value];
});

form.addEventListener("input", markStale);
form.addEventListener("change", markStale);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  resetStatus();

  if (!validate()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    firstInvalid?.focus();
    statusMessage.textContent = "Review the highlighted fields.";
    return;
  }

  generatedNote = buildNote();
  output.textContent = generatedNote;
  outputIsStale = false;
  reviewed.checked = false;
  reviewed.disabled = false;
  reviewedHint.textContent = "Review the generated note, then confirm its accuracy to enable copying.";
  updateCopyGate();
  statusMessage.textContent = "Note generated. Review it and confirm accuracy before copying.";
});

reviewed.addEventListener("change", () => {
  updateCopyGate();
  statusMessage.classList.remove("stale");
  statusMessage.textContent = reviewed.checked
    ? "Review confirmed. The note is ready to copy."
    : "Review the generated note and confirm its accuracy before copying.";
});

copyButton.addEventListener("click", async () => {
  if (!generatedNote || outputIsStale || !reviewed.checked) return;

  try {
    await copyText(generatedNote);
    statusMessage.textContent = "Note copied to the clipboard.";
    statusMessage.classList.remove("stale");
  } catch {
    statusMessage.textContent = "Copy was unavailable. Select the note text and copy it manually.";
  }
});

clearButton.addEventListener("click", () => {
  form.reset();
  interactionGuidance.textContent = guidanceByType[interactionType.value];
  for (const [fieldId] of requiredFields) setError(fieldId, "");
  generatedNote = "";
  outputIsStale = false;
  output.textContent = "Complete the form and select “Generate note.”";
  resetReviewGate();
  resetStatus();
  document.querySelector("#customerGoal").focus();
});

demoButton.addEventListener("click", () => {
  document.querySelector("#interactionType").value = "Technical issue";
  document.querySelector("#channel").value = "Chat";
  document.querySelector("#customerGoal").value = "Restore access to the fictional mobile application.";
  document.querySelector("#verification").value = "Completed";
  document.querySelector("#issueSummary").value = "The customer reported that the application returned to the sign-in screen immediately after authentication.";
  document.querySelector("#actionsTaken").value = "Confirmed the application version, checked the service-status example, cleared the local application cache, and completed a fresh sign-in.";
  document.querySelector("#outcome").value = "Resolved";
  document.querySelector("#followUp").value = "Customer will reply to the support thread if the issue returns.";
  document.querySelector("#disposition").value = "Troubleshooting completed";
  interactionGuidance.textContent = guidanceByType["Technical issue"];
  generatedNote = "";
  outputIsStale = false;
  output.textContent = "Demo data loaded. Select “Generate note.”";
  resetReviewGate();
  resetStatus();

  for (const [fieldId] of requiredFields) setError(fieldId, "");
});