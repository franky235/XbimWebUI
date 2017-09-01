"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* This file has been generated by spacker.exe utility. Do not change this file manualy as your changes
* will get lost when the file is regenerated. Original content is located in *.c files.
*/
exports.Shaders = {
    fragment_shader: ' precision mediump float; uniform vec4 uClippingPlaneA; uniform vec4 uClippingPlaneB; uniform bool uClippingA; uniform bool uClippingB; varying vec4 vFrontColor; varying vec4 vBackColor; varying vec3 vPosition; varying float vDiscard; void main(void) { if ( vDiscard > 0.5) discard; if (uClippingA) { vec4 p = uClippingPlaneA; vec3 x = vPosition; float distance = (dot(p.xyz, x) + p.w) / length(p.xyz); if (distance < 0.0){ discard; } } if (uClippingB) { vec4 p = uClippingPlaneB; vec3 x = vPosition; float distance = (dot(p.xyz, x) + p.w) / length(p.xyz); if (distance < 0.0) { discard; } } gl_FragColor = gl_FrontFacing ? vFrontColor : vBackColor; }',
    vertex_shader: ' attribute highp float aVertexIndex; attribute highp float aTransformationIndex; attribute highp float aStyleIndex; attribute highp float aProduct; attribute highp float aModelId; attribute highp vec2 aState; attribute highp vec2 aNormal; uniform mat4 uMVMatrix; uniform mat4 uPMatrix; uniform vec4 ulightA; uniform vec4 ulightB; uniform vec4 uHighlightColour; uniform float uMeter; uniform bool uColorCoding; uniform int uRenderingMode; uniform highp sampler2D uVertexSampler; uniform int uVertexTextureSize; uniform highp sampler2D uMatrixSampler; uniform int uMatrixTextureSize; uniform highp sampler2D uStyleSampler; uniform int uStyleTextureSize; uniform highp sampler2D uStateStyleSampler; varying vec4 vFrontColor; varying vec4 vBackColor; varying vec3 vPosition; varying float vDiscard; vec3 getNormal() { float U = aNormal[0]; float V = aNormal[1]; float PI = 3.1415926535897932384626433832795; float lon = U / 252.0 * 2.0 * PI; float lat = V / 252.0 * PI; float x = sin(lon) * sin(lat); float z = cos(lon) * sin(lat); float y = cos(lat); return normalize(vec3(x, y, z)); } vec4 getIdColor() { float product = floor(aProduct + 0.5); float B = floor(product / (256.0*256.0)); float G = floor((product - B * 256.0*256.0) / 256.0); float R = mod(product, 256.0); return vec4(R / 255.0, G / 255.0, B / 255.0, aModelId / 255.0); } vec2 getTextureCoordinates(int index, int size) { float x = float(index - (index / size) * size); float y = float(index / size); float pixelSize = 1.0 / float(size); return vec2((x + 0.5) * pixelSize, (y + 0.5) * pixelSize); } vec4 getColor() { int restyle = int(floor(aState[1] + 0.5)); if (restyle > 224) { int index = int(floor(aStyleIndex + 0.5)); vec2 coords = getTextureCoordinates(index, uStyleTextureSize); vec4 col = texture2D(uStyleSampler, coords); if (uRenderingMode == 0) { return col; } float intensity = (col.r + col.g + col.b) / 3.0; return vec4(intensity, intensity, intensity, col.a); } vec2 coords = getTextureCoordinates(restyle, 15); return texture2D(uStateStyleSampler, coords); } vec3 getVertexPosition() { int index = int(floor(aVertexIndex + 0.5)); vec2 coords = getTextureCoordinates(index, uVertexTextureSize); vec3 point = vec3(texture2D(uVertexSampler, coords)); if (aTransformationIndex < 0.0) { return point; } int tIndex = int(floor(aTransformationIndex + 0.5)); tIndex *= 4; mat4 transform = mat4( texture2D(uMatrixSampler, getTextureCoordinates(tIndex, uMatrixTextureSize)), texture2D(uMatrixSampler, getTextureCoordinates(tIndex + 1, uMatrixTextureSize)), texture2D(uMatrixSampler, getTextureCoordinates(tIndex + 2, uMatrixTextureSize)), texture2D(uMatrixSampler, getTextureCoordinates(tIndex + 3, uMatrixTextureSize)) ); return vec3(transform * vec4(point, 1.0)); } void main(void) { int state = int(floor(aState[0] + 0.5)); vDiscard = 0.0; if (state == 254) { vDiscard = 1.0; vFrontColor = vec4(0.0, 0.0, 0.0, 0.0); vBackColor = vec4(0.0, 0.0, 0.0, 0.0); vPosition = vec3(0.0, 0.0, 0.0); gl_Position = vec4(0.0, 0.0, 0.0, 1.0); return; } vec3 vertex = getVertexPosition(); vec3 normal = getNormal(); vec3 backNormal = normal * -1.0; if (uColorCoding) { vec4 idColor = getIdColor(); vFrontColor = idColor; vBackColor = idColor; } else { float lightAIntensity = ulightA[3]; vec3 lightADirection = normalize(ulightA.xyz - vertex); float lightBIntensity = ulightB[3]; vec3 lightBDirection = normalize(ulightB.xyz - vertex); float lightWeightA = max(dot(normal, lightADirection) * lightAIntensity, 0.0); float lightWeightB = max(dot(normal, lightBDirection) * lightBIntensity, 0.0); float backLightWeightA = max(dot(backNormal, lightADirection) * lightAIntensity, 0.0); float backLightWeightB = max(dot(backNormal, lightBDirection) * lightBIntensity, 0.0); float lightWeighting = lightWeightA + lightWeightB + 0.4; float backLightWeighting = backLightWeightA + backLightWeightB + 0.4; vec4 baseColor = vec4(1.0, 1.0, 1.0, 1.0); if (uRenderingMode == 2) { if (state == 252) { baseColor = getColor(); } else { baseColor = vec4(0.0, 0.0, 0.3, 0.5); } } if (state == 253) { baseColor = uHighlightColour; } if (uRenderingMode != 2 && state != 253) { baseColor = getColor(); } if (baseColor.a < 0.98 && uRenderingMode == 0) { vec3 trans = -0.002 * uMeter * normalize(normal); vertex = vertex + trans; } vFrontColor = vec4(baseColor.rgb * lightWeighting, baseColor.a); vBackColor = vec4(baseColor.rgb * backLightWeighting, baseColor.a); } vPosition = vertex; gl_Position = uPMatrix * uMVMatrix * vec4(vertex, 1.0); }'
};
//# sourceMappingURL=shaders.js.map