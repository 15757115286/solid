import { fail } from "assert";


const object = {};
const toString = object.toString;
export function now() {
    return Date.now();
}
export function isFunction(fn) {
    return toString.call(fn) == '[object Function]';
}
export function isObject(obj) {
    return toString.call(obj) == '[object Object]';
}
export function isNumber(num) {
    return toString.call(num) == '[object Number]';
}
export function isString(str) {
    return toString.call(str) == '[object String]';
}
export function isUndefined(unde) {
    return toString.call(unde) == '[object Undefined]';
}

export function getStyle(elem, props) {
    let style = getComputedStyle(elem);
    let from = {}, to = {};
    let keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
        let prop = keys[i];
        if (prop in style) {
            from[prop] = style[prop]
            to[prop] = props[prop];
        }
    }
    return { from, to };
}

let matchUtil = /\D+$/;

let cantAnimationProps = ['display', 'overflow'];

function canAnimation(prop) {
    if (isString(prop) && cantAnimationProps.indexOf(prop) == -1) {
        return true;
    }
    return false;
}


export function setStyle(elem, passTime, from, to, duration, tween, failCb) {
    let keys = Object.keys(from);
    for (let i = 0; i < keys.length; i++) {
        let prop = keys[i];
        let fromValue = from[prop],
            toValue = to[prop];
        if (isUndefined(fromValue) || isUndefined(toValue)) continue;
        if (!canAnimation(prop)) {
            if (isFunction(failCb)) {
                failCb.call(elem, elem, prop, from, to, passTime, duration);
            }
            continue;
        }
        let unit = fromValue.match(matchUtil);
        let _from = parseFloat(fromValue),
            _to = parseFloat(toValue);
        if (!isNaN(_from) && !isNaN(_to)) {
            let result = duration == 0 ? _to : tween(passTime, _from, _to - _from, duration);
            if (unit) {
                result += unit[0];
            }
            elem.style[prop] = result;
        }
    }
}

//styles为对象
export function setStyles(elem, styles) {
    for (let key in styles) {
        if (key in elem.style) {
            elem.style[key] = styles[key];
        }
    }
}

//props为对象
export function getStyles(elem, props) {
    let result = {};
    let style = elem.style;
    for (let key in props) {
        if (key in style) {
            result[key] = style[key];
        }
    }
    return result;
}


export function getTween(str) {
    let obj = tween;
    if (isString(str)) {
        let names = str.split('.');
        for (let i = 0; i < names.length; i++) {
            if(!isObject(obj)) break;
            obj = obj[names[i]];
        }
    }
    return isFunction(obj) ? obj : tween.linear;
}

/**
 * 流行的动画的缓动公式
 * t:动画的当前帧数（已经执行的时间）
 * b:动画的起始位置（起始样式）
 * c:动画的移动距离（结束的样式 - 起始的样式）
 * d:动画的总帧数（总运行时间）
 */
export const tween = {
    linear: function (t, b, c, d) { return c * t / d + b; },
    quad: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    cubic: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    quart: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    quint: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    sine: {
        easeIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    expo: {
        easeIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    circ: {
        easeIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    elastic: {
        easeIn: function (t, b, c, d, a, p) {
            if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
            if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function (t, b, c, d, a, p) {
            if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    back: {
        easeIn: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    bounce: {
        easeIn: function (t, b, c, d) {
            return c - tween.bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function (t, b, c, d) {
            if (t < d / 2) return tween.bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            else return tween.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}

const inlineMap = {
    a: true,
    abbr: true,
    acronym: true,
    b: true,
    bdo: true,
    big: true,
    br: true,
    cite: true,
    code: true,
    dfn: true,
    em: true,
    i: true,
    img: true,
    input: true,
    kbd: true,
    label: true,
    map: true,
    object: true,
    q: true,
    samp: true,
    script: true,
    select: true,
    small: true,
    span: true,
    strong: true
}

const blockMap = {
    address: true,
    article: true,
    aside: true,
    blockquote: true,
    canvas: true,
    dd: true,
    div: true,
    dl: true,
    dt: true,
    fieldset: true,
    figcaption: true,
    figure: true,
    footer: true,
    form: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    header: true,
    hgroup: true,
    hr: true,
    li: true,
    main: true,
    nav: true,
    noscript: true,
    ol: true,
    output: true,
    p: true,
    pre: true,
    section: true,
    table: true,
    tfoot: true,
    ul: true,
    video: true
}
Object.freeze(inlineMap);
Object.freeze(blockMap);
export function isInline(tagName) {
    tagName = isString(tagName) ? tagName : tagName.tagName;
    return inlineMap[tagName.toLowerCase()] || false;
}
export function isBlock(tagName) {
    tagName = isString(tagName) ? tagName : tagName.tagName;
    return blockMap[tagName.toLowerCase()] || false;
}
