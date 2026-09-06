<!-- guide-revision: mission-first-v1 -->

# Add focused custom agents

Custom agents package a reusable role or set of instructions. Give them a narrow responsibility and a clear output instead of duplicating the entire implementation process.

## Define the role

Describe the inputs it may inspect, the work it should perform and the evidence it must return. Separate project facts from instructions, and keep references tied to the correct repository.

Use the supported catalog and provider configuration. Availability and invocation differ between providers; a Markdown file alone does not prove that a role was installed or called.

## Test a useful handoff

Try the role on a bounded task and inspect its result. For example, a contract reviewer can compare an API change with its client usage and return specific incompatibilities. It should not mark a whole spec complete from a summary alone.

Use [custom loops](/docs/pipeline-the-loop-builder) to connect the role to deterministic checks and explicit continuation conditions.
