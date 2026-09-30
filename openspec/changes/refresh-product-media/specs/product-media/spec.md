## ADDED Requirements
### Requirement: Current and traceable product previews
The site SHALL serve fresh recordings and posters from the current Desktop UI and identify sample data in localized transcripts. Media metadata SHALL identify source revisions and prevent stale asset caching.

#### Scenario: Visitor views a recording
- **WHEN** a visitor opens any product recording
- **THEN** its poster, clip and localized transcript describe the same current interface and interactions

### Requirement: Latest hosted Companion
The site SHALL host a release build from the recorded upstream Companion revision using the existing cache-versioned bootstrap and asset layout.

#### Scenario: Visitor opens Companion after deployment
- **WHEN** a visitor loads /companion-app/
- **THEN** the current bootstrap and versioned assets load without reusing the previous UI bundle
