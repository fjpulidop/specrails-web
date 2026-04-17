## REMOVED Requirements

### Requirement: Hub showcase section with interactive iframe demo
**Reason**: The hub-demo iframe is lifted into the HeroSection so that the product is visible at first paint. A standalone HubShowcase section would duplicate content and bandwidth. The mobile screenshot fallback that lived in this requirement is re-introduced in the `hub-navigation` capability under the hero flow.
**Migration**: Any external links or navigation targeting `#hub-showcase` SHALL be redirected to `#hero` (the hero section now contains the iframe and its browser-chrome frame). The `HubShowcase.tsx` component SHALL be deleted.

### Requirement: Hub demo static build
**Reason**: This requirement described the `public/hub-demo/` artifact itself. The artifact is unchanged by this capability's removal; it is now owned and described by the specrails-hub capability `hub-demo-scripted-tour` and consumed by the `hub-navigation` capability's hero flow.
**Migration**: No change to the artifact. The requirement is moved conceptually to the specrails-hub change `hub-demo-scripted-tour` and to the `hub-navigation` capability's hero iframe scenarios.
