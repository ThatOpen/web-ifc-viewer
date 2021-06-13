import { Shader } from 'three';
import { VertexProps } from './BaseDefinitions';

export function OpaqueShader(shader: Shader) {
    shader.vertexShader = getVertexShader(shader);
    shader.fragmentShader = getFragmentShader(shader, opaque);
}

export function TransparentShader(shader: Shader) {
    shader.vertexShader = getVertexShader(shader);
    shader.fragmentShader = getFragmentShader(shader, transparent);
}

interface ShaderConfig {
  before: string;
  after: string;
}

const opaque: ShaderConfig = {
    before: `vec4 diffuseColor = vec4( diffuse, opacity );`,
    after: `vec4 diffuseColor = vec4( diffuse, opacity );
  if(vh > 0.){
    if (va <= 0.99) discard;
    else diffuseColor = vec4( vr, vg, vb, opacity );
  }`
};

const transparent: ShaderConfig = {
    before: `	vec4 diffuseColor = vec4( diffuse, opacity );`,
    after: `vec4 diffuseColor = vec4( diffuse, opacity );
            if(vh > 0.0){
            if (va == 0.0) discard;
            diffuseColor = vec4( vr, vg, vb, va );
            } else discard;`
};

function getFragmentShader(shader: Shader, config: ShaderConfig) {
    return `
  varying float vr;
  varying float vg;
  varying float vb;
  varying float va;
  varying float vh;
${shader.fragmentShader}`.replace(config.before, config.after);
}

function getVertexShader(shader: Shader) {
    return `
  attribute float sizes;
  attribute float ${VertexProps.r};
  attribute float ${VertexProps.g};
  attribute float ${VertexProps.b};
  attribute float ${VertexProps.a};
  attribute float ${VertexProps.h};
  varying float vr;
  varying float vg;
  varying float vb;
  varying float va;
  varying float vh;
${shader.vertexShader}`.replace(
    `#include <fog_vertex>`,
    `#include <fog_vertex>
    vr = ${VertexProps.r};
    vg = ${VertexProps.g};
    vb = ${VertexProps.b};
    va = ${VertexProps.a};
    vh = ${VertexProps.h};`
  );
}
