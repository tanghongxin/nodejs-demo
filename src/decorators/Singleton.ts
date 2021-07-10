export const SINGLETON_KEY = Symbol()

export type singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
}
export const Singleton = <T extends new (...args: any[]) => any>(classTarget: T) =>
  new Proxy(classTarget, {
    construct(target: singleton<T>, argumentsList, newTarget) {
      // Skip proxy for children
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argumentsList, newTarget)
      }
      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget)
      }
      return target[SINGLETON_KEY]
    },
  })
  