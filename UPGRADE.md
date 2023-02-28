Upgrade to a major Angular Version
---------------------------------------------- 

1. Go to https://github.com/nrwl/nx/blob/master/package.json and 
Search for the most recent tag that uses the angular version desired (TAG)

2. Once you found the tag, run the following command:
`npx create-nx-workspace@{TAG} sam-layouts --preset=angular --appName=sam-layouts --style=scss --linter=eslint --nx-cloud=no`

3. Generate initial library code
`nx g @nrwl/angular:library --name=layouts --importPath=@gsa-sam/layouts --publishable`

4. Add Storybook
`npm install --save-dev @nrwl/storybook@{TAG}` (Same tag version as above)

5. Generate Storybook Configuration files
`nx g @nrwl/angular:storybook-configuration sam-layouts`
✔ Configure a Cypress e2e app to run against the storybook instance? (Y/n) · n
✔ Automatically generate *.stories.ts files for components declared in this project? (Y/n) · n
✔ Automatically generate *.spec.ts files in the generated Cypress e2e app? (Y/n) · n

6. Add library stories to storybook config (/apps/sam-layouts/.storybook/main.js -> stories array)
`
'../../../libs/layouts/src/lib/**/*.stories.mdx',
'../../../libs/layouts/src/lib/**/*.stories.@(js|jsx|ts|tsx)'
`
7. Include library files in storybook tsconfig include array
`../../../libs/layouts/src/**/*`

8. In a different location clone sam-layouts repo
`git clone https://github.com/GSA/sam-layouts.git`

9. Run the migration and fix possible issues in the recently cloned repo
`nx migrate @nrwl/workspace@{TAG}`
`nx migrate --run-migrations`

10. Copy the following files from the cloned repo to the new nx workspace
- libs/layouts/src/lib
- libs/layouts/package.json
- libs/layouts/src/index.ts

11. Install GSA-SAM dependencies in the new nx workspace
All these dependencies should be already be working in the angular version desired
- @gsa-sam/components
- @gsa-sam/ngx-uswds-icons
- @gsa-sam/sam-formly
- @gsa-sam/sam-material-extensions
- @gsa-sam/sam-styles

12. Go to https://github.com/angular/components/blob/main/package.json and 
Search for the most recent tag that uses the angular version desired (MATERIAL TAG)

13. Install Angular Material dependencies in the new workspace
- @angular/material@{MATERIAL TAG}
- @angular/cdk@{MATERIAL TAG}

14. Install other dependencies
- lodash-es
- @ckeditor/ckeditor5-angular
- @ckeditor/ckeditor5-build-classic
- ngx-toastr <== (check for same angular version)

15. Disable "strict", "strictTemplates" and "noPropertyAccessFromIndexSignature" 
from `sam-layouts/libs/layouts/tsconfig.js` and `sam-layouts/apps/sam-layouts/tsconfig.js`

16. Enable sam-styles
copy /sam-layouts/blob/master/apps/sam-layouts/src/styles.scss

17. Copy the img folder located in the 'assets' directory

18. Set up compodoc for storybook on nx
https://nx.dev/packages/storybook/documents/angular-storybook-compodoc

19. Change output directory for documentation to 'docs'

20. Test everything 
`nx run layouts:build:production`
`nx storybook sam-layouts`
`nx build-storybook sam-layouts`
