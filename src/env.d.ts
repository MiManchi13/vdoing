/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, ComponentCustomOptions>;
  export default component;
}

declare function requirePlugin<T>(name:string):T;
declare namespace WechatMiniprogram {
  type IAnyObject = Record<string, any>
  type Optional<F> = F extends (arg: infer P) => infer R ? (arg?: P) => R : F
  type OptionalInterface<T> = { [K in keyof T]: Optional<T[K]> }
  interface AsyncMethodOptionLike {
      success?: (...args: any[]) => void
  }
  type PromisifySuccessResult<
      P,
      T extends AsyncMethodOptionLike
  > = P extends {
      success: any
  }
      ? void
      : P extends { fail: any }
      ? void
      : P extends { complete: any }
      ? void
      : Promise<Parameters<Exclude<T['success'], undefined>>[0]>

  //  TODO: Extract real definition from `lib.dom.d.ts` to replace this
  type IIRFilterNode = any
  type WaveShaperNode = any
  type ConstantSourceNode = any
  type OscillatorNode = any
  type GainNode = any
  type BiquadFilterNode = any
  type PeriodicWaveNode = any
  type BufferSourceNode = any
  type ChannelSplitterNode = any
  type ChannelMergerNode = any
  type DelayNode = any
  type DynamicsCompressorNode = any
  type ScriptProcessorNode = any
  type PannerNode = any
  type AnalyserNode = any
  type AudioListener = any
  type WebGLTexture = any
  type WebGLRenderingContext = any

  // TODO: fill worklet type
  type WorkletFunction = (...args: any) => any
  type AnimationObject = any
  type SharedValue<T = any> = T
  type DerivedValue<T = any> = T
}


declare let wx: WechatMiniprogram.Wx;