

# SAM Layouts

## Homepage
https://gsa.github.io/sam-layouts/

## Build @gsa-sam/layouts package

``` bash
# with IVY
nx run layout:build
```

``` bash
# without IVY
nx run layout:build:production
```

## Run docs site
``` bash
# http://localhost:4400
nx run sam-layouts:storybook
```

## Publish docs

```bash
# Update docs folder with latest code
 nx run sam-layouts:build-storybook -- --skip-nx-cache
 
## Push update docs folder to master brach
 ```
 
