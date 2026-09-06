<!-- guide-revision: mission-first-v1 -->

# Explore files and their evidence

Files is an explorer and observability surface. Use it to understand source and recorded changes, rather than as a code editor.

## Start from the right repository

Select the repository, search for a path and open the file. The same path in another repository is a different reference. Add useful files to the mission so the agent receives explicit context.

Read the source alongside its explanation. Summaries describe visible purpose, responsibilities and relationships; their model, generation time and freshness help you assess whether they still apply. Regenerate stale explanations when the source changes.

## Follow recorded work

Construction history and provenance connect a file with available jobs and diffs. A recorded diff describes that job's evidence, not necessarily every change ever made to the file. Missing history is different from a loading error.

Truncated source or absent evidence limits the explanation. Check the actual code and related files before accepting an inferred relationship. Use [run details](/docs/pipeline-the-job-detail-view) for the broader implementation and verification context.
