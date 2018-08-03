export const routerList = []
export const controllerList = []
export const parseList = []
export const paramList = []

export function Router(basename = '') {
    return (constrcutor: any) => {
      routerList.push({
          constrcutor,
          basename
      })
    }
}

export function Method(type: any) {
    return (path: any) => (target, name, descriptor) => {
       controllerList.push({
           target,
           type,
           path,
           method: name,
           controller: descriptor.value
       })
    }
}

export function Parse(type: any) {
    return (target, name, index) => {
        parseList.push({
            target,
            type,
            method: name,
            index
        })
    }
}

export function Param(position) {
    return (key) => (target, name, index) => {
     paramList.push({
         target,
         key,
         position,
         method: name,
         index
     })
    }
}

export const Body   = Param('body')
export const Header = Param('header')
export const Cookie = Param('cookie')
export const Query  = Param('query')
export const Params  = Param('params')
export const Get    = Method('get')
export const Post   = Method('post')