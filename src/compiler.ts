// extend the descriptor so we can store the scopeId on it
declare module 'vue/compiler-sfc' {
  interface SFCDescriptor {
    id: string
  }
}

import * as _compiler from 'vue/compiler-sfc'

let compiler: typeof _compiler

export const setCompiler = (userProvidedCompiler?: typeof _compiler | string) => {
  try {
    if (userProvidedCompiler) {
      compiler = typeof userProvidedCompiler === 'string' ? require(userProvidedCompiler) : userProvidedCompiler;
    }
    // Vue 3.2.13+ ships the SFC compiler directly under the `vue` package
    // making it no longer necessary to have @vue/compiler-sfc separately installed.
    else compiler = require('vue/compiler-sfc')
    return { compiler }
  } catch (e) {
    try {
      compiler = require('@vue/compiler-sfc')
      return { compiler }
    } catch (e) {
      throw new Error(
        `@vitejs/plugin-vue requires vue (>=3.2.13) or @vue/compiler-sfc ` +
          `to be present in the dependency tree.`
      )
    }
  }
}

export const getCompiler = () => compiler;