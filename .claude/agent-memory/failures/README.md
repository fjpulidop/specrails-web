# Failure Records Schema

Each file in this directory documents one class of CI or code-quality failure.

## Fields

- `error_type`: kebab-case slug identifying the failure class
- `first_seen`: ISO date when first observed
- `file_pattern`: glob matching affected files
- `severity`: "error" (CI failed) or "warning" (CI passed but issue noted)
- `root_cause`: specific description of why the failure occurs, with file/line if known
- `prevention_rule`: actionable imperative for the next developer
- `example_fix`: optional short description of the fix applied
