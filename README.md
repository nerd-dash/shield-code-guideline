# Code style guideline

## TypeScript style guideline


> Based on [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) 

### Identifiers

Identifiers must use only ASCII letters, digits, underscores (for constants and structured test method names). Thus each valid identifier name is matched by the regular expression \`\[\\w\]+\`.


|  Style          | Category                                                            |
|-----------------|---------------------------------------------------------------------|
| UpperCamelCase  | class / interface / type / enum / decorator / type parameters       |
| lowerCamelCase  | variable / parameter / function / method / property / module alias  |
| CONSTANT_CASE   | global constant values, including enum values                       |
   
    
*   **Type parameters**: Type parameters, like in `Array<T>`, may use a single upper case character (`T`) or `UpperCamelCase`.    
    
*   **`_` prefix/suffix**: Identifiers must not use `_` as a prefix or suffix.
    
    This also means that `_` must not be used as an identifier by itself (e.g. to indicate a parameter is unused).
    
*   **Constants**: `CONSTANT_CASE` indicates that a value is _intended_ to not be changed, and may be used for values that can technically be modified (i.e. values that are not deeply frozen) to indicate to users that they must not be modified.
    
    `````typescript
        const UNIT_SUFFIXES = {
          'milliseconds': 'ms',
          'seconds': 's',
        };
        // Even though per the rules of JavaScript UNIT_SUFFIXES is
        // mutable, the uppercase shows users to not modify it.
    `````   
    
    A constant can also be a `static readonly` property of a class.

    ```typescript
        class Foo {
          private static readonly MY_SPECIAL_NUMBER = 5;
        
          bar() {
            return 2 * Foo.MY_SPECIAL_NUMBER;
          }
        }
    ```   
    
    If a value can be instantiated more than once over the lifetime of the program, or if users mutate it in any way, it must use `lowerCamelCase`.
    
    If a value is an arrow function that implements an interface, then it can be declared `lowerCamelCase`.
    

#### Aliases

When creating a local-scope alias of an existing symbol, use the format of the existing identifier. The local alias must match the existing naming and format of the source. For variables use `const` for your local aliases, and for class fields use the `readonly` attribute.

  ```  typescript
    const {Foo} = SomeType;
    const CAPACITY = 5;
    
    class Teapot {
      readonly BrewStateEnum = BrewStateEnum;
      readonly CAPACITY = CAPACITY;
    }
  ```  

#### Naming style

TypeScript expresses information in types, so names _should not_ be decorated with information that is included in the type.

*   Do not use trailing or leading underscores for private properties or methods.
*   Do not use the `opt_` prefix for optional parameters.
*   Do not mark interfaces specially (`IMyInterface` or `MyFooInterface`). When introducing an interface for a class, give it a name that expresses why the interface exists in the first place (e.g. `class TodoItem` and `interface TodoItemStorage` if the interface expresses the format used for storage/serialization in JSON).
*   Suffixing `Observable`s with `$` is a common external can help resolve confusion regarding observable values vs concrete values and should be used.

#### Descriptive names

Names _must_ be descriptive and clear to a new reader. Do not use abbreviations that are ambiguous or unfamiliar to readers outside your project, and do not abbreviate by deleting letters within a word.


### Comments & Documentation

#### JSDoc vs comments

There are two types of comments, JSDoc (`/** ... */`) and non-JSDoc ordinary comments (`// ...` or `/* ... */`).

*   Use `/** JSDoc */` comments for documentation, i.e. comments a user of the code should read.
*   Use `// line comments` for implementation comments, i.e. comments that only concern the implementation of the code itself.

JSDoc comments are understood by tools (such as editors and documentation generators), while ordinary comments are only for other humans.


#### Omit comments that are redundant with TypeScript

For example, do not declare types in `@param` or `@return` blocks, do not write `@implements`, `@enum`, `@private` etc. on code that uses the `implements`, `enum`, `private` etc. keywords.

#### Do not use `@override`

Do not use `@override` in TypeScript source code.

`@override` is not enforced by the compiler, which is surprising and leads to annotations and implementation going out of sync. Including it purely for documentation purposes is confusing.

#### Make comments that actually add information

For non-exported symbols, sometimes the name and type of the function or parameter is enough. Code will _usually_ benefit from more documentation than just variable names though!

*   Avoid comments that just restate the parameter name and type, e.g.
    
       ```typescript
       /** @param fooBarService The Bar service for the Foo application. */
       ```
        
    
*   Because of this rule, `@param` and `@return` lines are only required when they add information, and may otherwise be omitted.
    ```typescript
        /**
         * POSTs the request to start coffee brewing.
         * @param amountLitres The amount to brew. Must fit the pot size!
         */
        brew(amountLitres: number, logger: Logger) {
          // ...
        }
        ```

#### Place documentation prior to decorators

When a class, method, or property have both decorators like `@Component` and JsDoc, please make sure to write the JsDoc before the decorator.

*   Do not write JsDoc between the Decorator and the decorated statement.
    
    ```typescript
        @Component({
          selector: 'foo',
          template: 'bar',
        })
        /** Component that prints "bar". */
        export class FooComponent {}
    ```    
    
*   Write the JsDoc block before the Decorator.
    
    ```typescript
        /** Component that prints "bar". */
        @Component({
          selector: 'foo',
          template: 'bar',
        })
        export class FooComponent {}
    ```    
    

Language Rules
--------------

### Visibility

Restricting visibility of properties, methods, and entire types helps with keeping code decoupled.

*   Limit symbol visibility as much as possible.
*   TypeScript symbols are public by default. Never use the `public` modifier except when declaring non-readonly public parameter properties (in constructors).


  ```typescript
  /** Avoid! */
    class Foo {
      public bar = new Bar();  // BAD: public modifier not needed
    
      constructor(public readonly baz: Baz) {}  // BAD: readonly implies it's a property which defaults to public
    }
  ```
    

  ```typescript
  /** Good! */
    class Foo {
      bar = new Bar();  // GOOD: public modifier not needed
    
      constructor(public baz: Baz) {}  // public modifier allowed
    }
  ```  

See also [export visibility](#export-visibility) below.


### Class Members

#### No `#private` fields

Use TypeScript's visibility annotations:

  ```typescript
    class Clazz {
      private ident = 1;
    }
  ```


#### Use `readonly`

Mark properties that are never reassigned with the `readonly` modifier (these need not be deeply immutable).


#### Field initializers

If a class member is not a parameter, initialize it where it's declared, which sometimes lets you drop the constructor entirely.


  ```typescript
  /** Avoid! */
    class Foo {
      private readonly userList: string[];
      constructor() {
        this.userList = [];
      }
    }
  ```
    

  ```typescript
  /** Good! */
    class Foo {
      private readonly userList: string[] = [];
    }
  ```  

#### Getters and Setters (Accessors)

Getters and setters for class members may be used. The getter method must be a [pure function](https://en.wikipedia.org/wiki/Pure_function) (i.e., result is consistent and has no side effects). They are also useful as a means of restricting the visibility of internal or verbose implementation details (shown below).

  ```typescript
    class Foo {
      constructor(private readonly someService: SomeService) {}
    
      get someMember(): string {
        return this.someService.someVariable;
      }
    
      set someMember(newValue: string) {
        this.someService.someVariable = newValue;
      }
    }
  ```
    

If an accessor is used to hide a class property, the hidden property may be prefixed or suffixed with any whole word, like `internal`. When using these private properties, access the value through the accessor whenever possible. At least one accessor for a property must be non-trivial: do not define pass-through accessors only for the purpose of hiding a property. Instead, make the property public (or consider making it `readonly` rather than just defining a getter with no setter).

  ```typescript
    class Foo {
      private internalBar = '';
      get bar() {
        return this.internalBar || 'bar';
      }
    
      set bar(internal: string) {
        this.internalBar = internal.trim();
      }
    }
  ```  

  ```typescript
    class Bar {
      private barInternal = '';
      // Neither of these accessors have logic, so just make bar public.
      get bar() {
        return this.barInternal;
      }
    
      set bar(value: string) {
        this.barInternal = value;
      }
    }
  ```  

### Primitive Types & Wrapper Classes

TypeScript code must not instantiate the wrapper classes for the primitive types `String`, `Boolean`, and `Number`. Wrapper classes have surprising behaviour, such as `new Boolean(false)` evaluating to `true`.

  ```typescript
    const s = new String('hello');
    const b = new Boolean(false);
    const n = new Number(5);

    const s = 'hello';
    const b = false;
    const n = 5;
  ```

### Array constructor

TypeScript code must not use the `Array()` constructor, with or without `new`. It has confusing and contradictory usage:

  ```typescript
    const a = new Array(2); // [undefined, undefined]
    const b = new Array(2, 3); // [2, 3];
  ```

Instead, always use bracket notation to initialize arrays, or `from` to initialize an `Array` with a certain size:

  ```typescript
    const a = [2];
    const b = [2, 3];
    
    // Equivalent to Array(2):
    const c = [];
    c.length = 2;
    
    // [0, 0, 0, 0, 0]
    Array.from<number>({length: 5}).fill(0);
  ```

### Variables

Always use `const` or `let` to declare variables. Use `const` by default, unless a variable needs to be reassigned. Never use `var`.

  ```typescript
    const foo = otherValue;  // Use if "foo" never changes.
    let bar = someValue;     // Use if "bar" is ever assigned into later on.
  ```

`const` and `let` are block scoped, like variables in most other languages. `var` in JavaScript is function scoped, which can cause difficult to understand bugs. Don't use it.

  ```typescript
    var foo = someValue;     // Don't use - var scoping is complex and causes bugs.
  ```

Variables must not be used before their declaration.

### Exceptions

Always use `new Error()` when instantiating exceptions, instead of just calling `Error()`. Both forms create a new `Error` instance, but using `new` is more consistent with how other objects are instantiated.

  ```typescript
    throw new Error('Foo is not a valid bar.');
    

    throw Error('Foo is not a valid bar.');
  ``` 

### Iterating objects

Iterating objects with `for (... in ...)` is error prone. It will include enumerable properties from the prototype chain.

Do not use unfiltered `for (... in ...)` statements:

  ```
    for (const x in someObj) {
      // x could come from some parent prototype!
    }
  ```  

Use `for (... of Object.keys(...))`.

  ```typescript
    for (const x in someObj) {
      if (!someObj.hasOwnProperty(x)) continue;
      // now x was definitely defined on someObj
    }
    for (const x of Object.keys(someObj)) { // note: for _of_!
      // now x was definitely defined on someObj
    }
    for (const [key, value] of Object.entries(someObj)) { // note: for _of_!
      // now key was definitely defined on someObj
    }
  ```
    

### Iterating containers

Do not use `for (... in ...)` to iterate over arrays. It will counterintuitively give the array's indices (as strings!), not values:

  ```
    for (const x in someArray) {
      // x is the index!
    }
  ```  

Use `for (... of someArr)` or vanilla `for` loops with indices to iterate over arrays.
  
  ```typescript
    for (const x of someArr) {
      // x is a value of someArr.
    }
    
    for (let i = 0; i < someArr.length; i++) {
      // Explicitly count if the index is needed, otherwise use the for/of form.
      const x = someArr[i];
      // ...
    }
    for (const [i, x] of someArr.entries()) {
      // Alternative version of the above.
    }
  ```

### Using the spread operator

Using the spread operator `[...foo]; {...bar}` is a convenient shorthand for copying arrays and objects. When using the spread operator on objects, later values replace earlier values at the same key.

  ```typescript
    const foo = {
      num: 1,
    };
    
    const foo2 = {
      ...foo,
      num: 5,
    };
    
    const foo3 = {
      num: 5,
      ...foo,
    }
    
    foo2.num === 5;
    foo3.num === 1;
  ```

### Control flow statements & blocks

Control flow statements always use blocks for the containing code.

  ```typescript
    for (let i = 0; i < x; i++) {
      doSomethingWith(i);
      andSomeMore();
    }
    if (x) {
      doSomethingWithALongMethodName(x);
    }
  ```    

### Switch Statements

All `switch` statements must contain a `default` statement group, even if it contains no code.

  ```typescript
    switch (x) {
      case Y:
        doSomethingElse();
        break;
      default:
        // nothing to do.
    }
  ```  


Non-empty statement groups (`case ...`) may not fall through (enforced by the compiler):

  ```typescript
    switch (x) {
      case X:
        doSomething();
        // fall through - not allowed!
      case Y:
        // ...
    }
  ```    

Empty statement groups are allowed to fall through:

  ```typescript
    switch (x) {
      case X:
      case Y:
        doSomething();
        break;
      default: // nothing to do.
    }
  ```   

### Equality Checks

Always use triple equals (`===`) and not equals (`!==`). The double equality operators cause error prone type coercions that are hard to understand and slower to implement for JavaScript Virtual Machines. See also the [JavaScript equality table](https://dorey.github.io/JavaScript-Equality-Table/).

  ```typescript
    if (foo == 'bar' || baz != bam) {
      // Hard to understand behaviour due to type coercion.
    }
    

    if (foo === 'bar' || baz !== bam) {
      // All good here.
    }
  ```    

**Exception**: Comparisons to the literal `null` value may use the `==` and `!=` operators to cover both `null` and `undefined` values.

  ```typescript
    if (foo == null) {
      // Will trigger when foo is null or undefined.
    }
  ```    
    

### Function Expressions

#### Use arrow functions in expressions

Always use arrow functions instead of pre-ES6 function expressions defined with the `function` keyword.

  ```typescript
  /** Good! */  
    bar(() => { this.doSomething(); })
  ```  
    
  ```typescript
  /** Avoid! */ 
    bar(function() { ... })
  ```


### Automatic Semicolon Insertion

Do not rely on Automatic Semicolon Insertion (ASI). Explicitly terminate all statements using a semicolon. This prevents bugs due to incorrect semicolon insertions and ensures compatibility with tools with limited ASI support (e.g. clang-format).

### @ts-ignore

Do not use `@ts-ignore`. It superficially seems to be an easy way to fix a compiler error, but in practice, a specific compiler error is often caused by a larger problem that can be fixed more directly.


### Type and Non-nullability Assertions

Type assertions (`x as SomeType`) and non-nullability assertions (`y!`) are unsafe. Both only silence the TypeScript compiler, but do not insert any runtime checks to match these assertions, so they can cause your program to crash at runtime.

Because of this, you _should not_ use type and non-nullability assertions without an obvious or explicit reason for doing so.

Instead of the following:

  ```typescript
    (x as Foo).foo();
    
    y!.bar();
  ```
  
    

#### Type Assertions Syntax

Type assertions must use the `as` syntax (as opposed to the angle brackets syntax). This enforces parentheses around the assertion when accessing a member.

  ```typescript
    const x = (<Foo>z).length;
    const y = <Foo>z.length;
  ```

  ```typescript
    const x = (z as Foo).length;
  ```

#### Type Assertions and Object Literals

Use type annotations (`: Foo`) instead of type assertions (`as Foo`) to specify the type of an object literal. This allows detecting refactoring bugs when the fields of an interface change over time.

  ```typescript
    interface Foo {
      bar: number;
      baz?: string;  // was "bam", but later renamed to "baz".
    }
    
    const foo = {
      bar: 123,
      bam: 'abc',  // no error!
    } as Foo;
    
    function func() {
      return {
        bar: 123,
        bam: 'abc',  // no error!
      } as Foo;
    }
    

    interface Foo {
      bar: number;
      baz?: string;
    }
    
    const foo: Foo = {
      bar: 123,
      bam: 'abc',  // complains about "bam" not being defined on Foo.
    };
    
    function func(): Foo {
      return {
        bar: 123,
        bam: 'abc',   // complains about "bam" not being defined on Foo.
      };
    }
  ```

#### Optimization compatibility for property access

Code must not mix quoted property access with dotted property access:

  ```typescript
    // Bad: code must use either non-quoted or quoted access for any property
    // consistently across the entire application:
    console.log(x['someField']);
    console.log(x.someField);
  ```
    

#### Optimization compatibility for module object imports

When importing a module object, directly access properties on the module object rather than passing it around. This ensures that modules can be analyzed and optimized. Treating as namespaces is fine.

  ```typescript
    import {method1, method2} from 'utils';
    class A {
      readonly utils = {method1, method2};
    }
    

    import * as utils from 'utils';
    class A {
      readonly utils = utils;
    }
  ```   

### Debugger statements and Console functions

Debugger statements and Console functions must not be included in production code.

  ```typescript
    function debugMe() {
      debugger;
    }

    function testingCode() {
      console.log('I have been called');
    }
   ``` 

Type System
-----------

### Type Inference

Leave out type annotations for trivially inferred types: variables or parameters initialized to a `string`, `number`, `boolean`, `RegExp` literal or `new` expression.

  ```typescript
    const x = 15;  // Type inferred.

    const x: boolean = true;  // Bad: 'boolean' here does not aid readability
    

    // Bad: 'Set' is trivially inferred from the initialization
    const x: Set<string> = new Set();
    

    const x = new Set<string>();
  ```

For more complex expressions, type annotations can help with readability of the program. Whether an annotation is required is decided by the code reviewer.

#### Return types

You _should_ to include return type annotations for functions and methods to clarify complex return types. 

There are two benefits to explicitly typing out the implicit return values of functions and methods:

*   More precise documentation to benefit readers of the code.
*   Surface potential type errors faster in the future if there are code changes that change the return type of the function.

### Null vs Undefined

TypeScript supports `null` and `undefined` types. Nullable types can be constructed as a union type (`string|null`); similarly with `undefined`. There is no special syntax for unions of `null` and `undefined`.
  

### Interfaces vs Type Aliases

TypeScript supports for naming a type expression. This can be used to name primitives, unions, tuples, and any other types.

However, when declaring types for objects, use interfaces instead of a type alias for the object literal expression.


  ```typescript
  /** Avoid! */
    type User = {
      firstName: string,
      lastName: string,
    }
  ```


  ```typescript
  /** Good! */
    interface User {
      firstName: string;
      lastName: string;
    }
  ```
    


### `any` Type

TypeScript's `any` type is a super and subtype of all other types, and allows dereferencing all properties. As such, `any` is dangerous - it can mask severe programming errors, and its use undermines the value of having static types in the first place.

**Consider _not_ to use `any`.** In circumstances where you want to use `any`, consider one of:

*   [Provide a more specific type](#any-specific)
*   [Use `unknown`](#any-unknown)

#### Providing a more specific type

Use interfaces , an inline object type, or a type alias:

  ```typescript
    // Use declared interfaces to represent server-side JSON.
    declare interface MyUserJson {
      name: string;
      email: string;
    }
    
    // Use type aliases for types that are repetitive to write.
    type MyType = number|string;
    
    // Or use inline object types for complex returns.
    function getTwoThings(): {something: number, other: string} {
      // ...
      return {something, other};
    }
    
    // Use a generic type, where otherwise a library would say `any` to represent
    // they don't care what type the user is operating on (but note "Return type
    // only generics" below).
    function nicestElement<T>(items: T[]): T {
      // Find the nicest element in items.
      // Code can also put constraints on T, e.g. <T extends HTMLElement>.
    }
  ```
    

#### Using `unknown` over `any`

The `any` type allows assignment into any other type and dereferencing any property off it. Often this behaviour is not necessary or desirable, and code just needs to express that a type is unknown. Use the built-in type `unknown` in that situation — it expresses the concept and is much safer as it does not allow dereferencing arbitrary properties.


  ```typescript
    // Can assign any value (including null or undefined) into this but cannot
    // use it without narrowing the type or casting.
    const val: unknown = value;
    

    const danger: any = value /* result of an arbitrary expression */;
    danger.whoops();  // This access is completely unchecked!
  ```

To safely use `unknown` values, narrow the type using a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)


## Angular Style guidelines

### All [Angular Guidelines](https://angular.io/guide/styleguide) should be observed and followed.

	Please read the official guidelines for further details.

### Component Member visibility

On top of the [Angular component member sequence](https://angular.io/guide/styleguide#style-05-14) also the visibility of the members should be observed:

#### No modifier:

Used for `public` methods and properties that **_are used on the view_**. 

```typescript
@Component({
  selector: 'toh-hero-list',
  template: `
    <section>
      Our list of heroes:
      <toh-hero *ngFor="let hero of heroes" [hero]="hero">
      </toh-hero>
      Total powers: {{totalPowers}}<br>
      Average power: {{avgPower}}
    </section>
  `
})
export class HeroListComponent {
  heroes: Hero[];
  totalPowers = 0;
  
  get avgPower() {
    return this.totalPowers / this.heroes.length;
  }
}
```

#### Public modifier:

Used for `public` methods and properties that **_are NOT used on the view_** but should be public.

#### Private and Protected modifiers:

Used for `non public` methods and properties that **_are used only on the component class or its inherited classes_** but should be public.
