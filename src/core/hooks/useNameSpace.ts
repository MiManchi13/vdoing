import { ref } from "vue";

export const defaultNamespace = "py";
const statePrefix = "is-";

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const useNamespace = (block: string) => {
  const namespace = ref(defaultNamespace);
  /** 块 生成class名 namespace-block */
  const b = (blockSuffix = "") =>
    _bem(namespace.value, block, blockSuffix, "", "");
  /** 元素 生成class名 namespace-block__element */
  const e = (element?: string) =>
    element ? _bem(namespace.value, block, "", element, "") : "";
  /** 版本 生成class名 namespace-block--modifier */
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, "")
      : "";
  /** 元素-版本 生成class名 namespace-block__element--modifier */
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.value, block, "", element, modifier)
      : "";
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, "", modifier)
      : "";
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : "";
  /** 状态 生成class名 is-xxx */
  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  /** iconfont图标 生成class名 iconfont py-iconfont-xxx  */
  // iconfont py-iconfont-icon
  const icon = (blockSuffix?: string) => {
    return `iconfont icon-font-${blockSuffix}`;
  };
  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };

  const cssVarName = (name: string) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`;

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
    icon,
  };
};

export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
