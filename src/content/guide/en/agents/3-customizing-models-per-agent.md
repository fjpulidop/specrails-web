<!-- guide-revision: mission-first-v1 -->

# Tune models without losing the contract

Model tuning should improve a known stage of your process while leaving the spec and verification obligations intact.

## Make a bounded change

Open the available model settings for the provider, rail or role you intend to change. Use supported identifiers and effort values. If the UI does not offer a capability, do not assume that adding a similarly named value to a prompt enables it.

Check which scope the setting affects: a conversation, an execution step or a provider's role profile. Save the change and inspect the effective configuration on the next run.

## Reassess quality and usage

Compare the actual diff, verification and retry count. Keep stronger review when the task involves unfamiliar code or cross-repository contracts. Cost reporting varies by provider, so unavailable usage must not be treated as zero.

A runtime update may change available capabilities. Resolve setup or compatibility errors before using the new settings in a production project.
