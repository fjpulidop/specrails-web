<!-- guide-revision: mission-first-v1 -->

# Install and connect your provider

Install Specrails, check its prerequisites and sign in to the provider you intend to use before asking an agent to work.

## Choose the application

Download an installer for your machine from the [download page](/download). Check the artifacts and requirements of that release: native builds target macOS Apple Silicon and Windows x64/ARM64. An available installer is not a claim that every platform feature has identical behavior.

The npm distribution serves Specrails in a browser and needs Node.js 20.19+, Git and an authenticated provider CLI:

```sh
npm install -g specrails-desktop
specrails-desktop start
```

Open `http://127.0.0.1:4200`. This does not install the native app or enable separate native mission windows. Avoid running both distributions on the same port.

## Complete setup

Install and authenticate at least one supported provider using its own CLI. In Specrails, check provider availability and add your project. Core installation prepares the required workflow artifacts; it does not include a model subscription.

If setup reports a missing runtime or pending update, resolve that status before launching implementations. Keep the reported error: an empty view is not proof that your projects were deleted.

Next: [add your project](/docs/getting-started-adding-your-first-project).
