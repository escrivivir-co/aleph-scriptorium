Angular Language Service
========================

Features
--------

This extension provides a rich editing experience for Angular templates, both inline and external templates including:

-   Completions lists
-   AOT Diagnostic messages
-   Quick info
-   Go to definition

Download
--------

Download the extension from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template "https://marketplace.visualstudio.com/items?itemName=Angular.ng-template").

Configuring compiler options for the Angular Language Service
-------------------------------------------------------------

The Angular Language Service uses the same set of options that are used to compile the application. To get the most complete information in the editor, set the `strictTemplates` option in `tsconfig.json`, as shown in the following example:

```
"angularCompilerOptions": {  "strictTemplates": true}

```

For more information, see the [Angular compiler options](https://angular.io/guide/angular-compiler-options "https://angular.io/guide/angular-compiler-options") guide.

Versioning
----------

The language service extension relies on the `@angular/language-service` and `typescript` packages for its backend. `@angular/language-service` is always bundled with the extension, and is always the latest version at the time of the release. `typescript` is loaded, in order of priority, from:

1.  The path specified by `typescript.tsdk` or `js/ts.tsdk.path` in project or global settings.
2.  *(Recommended)* The version of `typescript` bundled with the Angular Language Service extension.
3.  The version of `typescript` present in the current workspace's node_modules.

We suggest **not** specifying `typescript.tsdk` or `js/ts.tsdk.path` in your VSCode settings per method (1) above. If the `typescript` package is loaded by methods (1) or (3), there is a potential for a mismatch between the API expected by `@angular/language-service` and the API provided by `typescript`. This could lead to a failure of the language service extension.