'use strict'

create = Object.create or (o) ->
  class F
    constructor: -> @constructor = F
  F:: = o
  return new F

mixin = (dest, objs...) ->
  for obj in objs
    dest[k] = v for own k,v of obj

  return dest

ck = (constructor, prototypeProperties, prototypeChain) ->
  if arguments.length is 1
    prototypeProperties = {}
  else if arguments.length is 2
    prototypeChain = prototypeProperties
    prototypeProperties = {}

  prototypeProperties = prototypeProperties or {}

  if typeof prototypeChain is 'function'
    constructor:: = create prototypeChain::
    mixin constructor::, prototypeProperties
  else if prototypeChain
    constructor:: = create prototypeChain
    mixin constructor::, prototypeProperties
  else
    constructor:: = mixin {}, prototypeProperties

  constructor::constructor = constructor

  return constructor

ck.create = create
ck.mixin = mixin

# Preserve legacy API
ck.ck = ck
ck.constructorKit = ck

module.exports = ck