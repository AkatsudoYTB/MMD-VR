import{t as e}from"./shaderStore-D-XQlhUT.js";import"./clipPlaneFragment-DVK0wgyZ.js";import"./logDepthDeclaration-3gXGtHbI.js";import"./logDepthFragment-C5lxT4l1.js";var t=`mmdOutlinePixelShader`,n=`
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
uniform vec4 color;
#ifdef ALPHATEST
varying vec2 vUV;uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<0.4)
discard;
#endif
#include<logDepthFragment>
gl_FragColor=color;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;e.ShadersStore[t]=n;var r={name:t,shader:n};export{r as MmdOutlinePixelShader};