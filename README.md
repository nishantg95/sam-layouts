

# SAM Layouts

## Homepage
https://gsa.github.io/sam-layouts/

## Publish @gsa-sam/layouts package

``` bash
# Publish to npm
# Update libs/layout/package.json with new version then run..
nx run layouts:build:production
cd dist/libs/layouts/
npm publish

# Publish to GSA Artifactory
cd dist/libs/layouts/
npm pack
# Upload to GSA Artifactory
```

## Run docs site
``` bash
# http://localhost:4400
nx run sam-layouts:storybook
```

## Publish docs

```bash
# Update compodoc
npm run docs:json

# Update docs folder with latest code
 nx run sam-layouts:build-storybook -- --skip-nx-cache
 
## Push update docs folder to master brach
 ```
 
