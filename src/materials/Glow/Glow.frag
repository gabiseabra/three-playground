uniform vec3	color;
uniform float	coefficient;
uniform float	power;

varying vec3	vVertexNormal;
varying vec3	vVertexWorldPosition;

void main() {
	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;
	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
	viewCameraToVertex	= normalize(viewCameraToVertex);
	float intensity = pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);
	gl_FragColor = vec4(color, intensity);
}
