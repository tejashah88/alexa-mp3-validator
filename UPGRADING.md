## Upgrading from < 1.0
Previously, `validateMP3` would only take file paths as a valid input and always throw an AudioValidationError in any of the requirements weren't met. Now the new syntax can accept a Buffer and will offer the option to either throw an AudioValidationError or simply return `false`. The new function will always return true if all the requirements are met.

### Old Syntax
```javascript
Void validateMP3(String filepath)
```

### New Syntax
```javascript
Boolean validateMP3(String filepath, optional Boolean throwOnValidationError = false)
```