import { watch, getCurrentScope, onScopeDispose } from "vue-demi"
import type { MaybeElementRef, MaybeRef } from "./unrefElement"
import { unrefElement } from "./unrefElement"
// import { defaultWindow } from "../_configurable"

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any
  removeEventListener(event: Events, fn?: any, options?: any): any
}
export type Fn = () => void

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export interface GeneralEventListener<E = Event> {
  (evt: E): void
}

export const isString = (val: unknown): val is string => typeof val === "string"
export const noop = () => {}

/**
 * Call onScopeDispose() if it's inside a effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}

export const defaultWindow = typeof window !== "undefined" ? window : undefined

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 1: Omitted Window target
 *
 * @see https://vueuse.org/useEventListener
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  listener: (this: Document, ev: DocumentEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Custom event target with event type infer
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target fallback
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<EventType = Event>(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

export function useEventListener(...args: any[]) {
  let target: MaybeRef<EventTarget> | undefined
  let event: string
  let listener: any
  let options: any

  if (isString(args[0])) {
    ;[event, listener, options] = args
    target = defaultWindow
  } else {
    ;[target, event, listener, options] = args
  }

  if (!target) return noop

  let cleanup = noop

  const stopWatch = watch(
    () => unrefElement(target as unknown as MaybeElementRef),
    (el) => {
      cleanup()
      if (!el) return

      el.addEventListener(event, listener, options)

      cleanup = () => {
        el.removeEventListener(event, listener, options)
        cleanup = noop
      }
    },
    { immediate: true, flush: "post" }
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  tryOnScopeDispose(stop)
  
  return stop
}

export default useEventListener
