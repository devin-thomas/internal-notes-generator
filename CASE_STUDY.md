# Case Study: Reducing Support Documentation Friction with a Lightweight Internal Tool
> **Project attribution:** Designed and built by Devin Thomas. This public version is a clean-room reconstruction of the original internal tool.


## Overview

While working at Accenture on a customer-support engagement for a major global social media platform, I noticed that required case notes were consuming a meaningful amount of agent time and were vulnerable to inconsistent structure. I built a lightweight browser-based tool in HTML, CSS, and JavaScript to help agents prepare clearer, more complete, and more consistent documentation.

The tool began as a small pilot, expanded to more than 20 agents, and was later formalized for broader team use by QA leadership. Based on observed agent workflows, it reduced after-contact administrative work by approximately 20–30 minutes per agent per day while improving note structure, data quality, and QA consistency.

## The problem

Agents were required to document every customer interaction. The underlying task was straightforward, but repeated manual entry created several problems:

- Important information could be omitted or placed inconsistently.
- Agents spent unnecessary time remembering formatting and documentation requirements.
- Variations in note quality created avoidable QA risk.
- Repetitive administrative work increased after-contact time.
- Process updates could make previously reliable habits or templates outdated.

The opportunity was not to replace agent judgment. It was to remove preventable friction from a repetitive workflow.

## My role

I independently identified the workflow problem, designed the initial solution, implemented it with front-end web technologies, gathered feedback from users, and revised it as documentation expectations changed.

My work included:

- Translating a repetitive operational process into a simple guided interface
- Organizing required information into a consistent note structure
- Adding lightweight validation and prompts to reduce omissions
- Iterating on the tool in response to agent and QA feedback
- Maintaining alignment as process requirements changed
- Supporting adoption among peers and explaining how to use the tool effectively

## The solution

The application guided an agent through the information needed for a complete support note, then transformed those inputs into a standardized output that could be reviewed and copied into the approved system of record.

Its core design principles were:

1. **Fast:** The interface needed to be faster than writing the note manually.
2. **Clear:** Agents needed to understand what information belonged in each section.
3. **Consistent:** The resulting note needed a predictable structure.
4. **Flexible:** The workflow needed to accommodate more than one support scenario.
5. **Maintainable:** Changes to documentation expectations needed to be easy to incorporate.
6. **Human-reviewed:** The agent remained responsible for confirming that the final note was accurate.

The original employer-specific implementation is not reproduced publicly. The included demo is a clean-room reconstruction based only on the general problem of structured support documentation.

## Adoption and impact

The initial pilot involved approximately 10 agents and later expanded to more than 20 users. QA leadership subsequently elevated the tool into an official project resource.

Observed outcomes included:

- Approximately 20–30 minutes less after-contact administrative work per agent per day
- More consistent note structure
- Better completeness and data quality
- Reduced cognitive load during repetitive documentation
- Easier coaching around what a high-quality note should contain
- A simpler way to incorporate updated documentation expectations

These figures describe practical workflow observations from the pilot and rollout; they are not presented as the results of a controlled experiment.

## Technical approach

The original tool used:

- HTML for form structure and content organization
- CSS for a clear, efficient interface
- JavaScript for conditional behavior, validation, note assembly, and copy-ready output

A lightweight client-side approach was appropriate because the core need was guided text generation rather than a large distributed system. Keeping the tool simple also made it easier to update and easier for agents to use.

## What I learned

This project taught me that useful software does not need to be technically extravagant. The strongest part of the project was the connection between domain knowledge and implementation:

- I understood the operational pain because I performed the work myself.
- I could distinguish genuinely required information from unnecessary complexity.
- I could observe where users hesitated and revise the interface accordingly.
- I learned to treat QA feedback and process changes as product requirements.
- I saw how a small internal tool could create measurable value when it addressed a frequent workflow.

It also gave me practical experience taking a tool from personal prototype to shared team resource.

## Confidentiality and clean-room scope

This case study intentionally excludes:

- Employer or client source code
- Internal screenshots or visual designs
- Real customer or employee data
- Proprietary field names, templates, policies, or decision logic
- Internal systems, URLs, credentials, and documentation
- Exact workflow sequences that are not public
- Claims of formal product ownership

The public demo represents the general engineering pattern, not a copy of the original application.
