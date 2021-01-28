var output;
var indexVertex;
var indexVertexUvs;
var indexNormals;
var vertex;
var color;
var normal;
var uv;
var i, j, k, l, m, face;

function init() {
  output = '';
  indexVertex = 0;
  indexVertexUvs = 0;
  indexNormals = 0;
  vertex = new THREE.Vector3();
  color = new THREE.Color();
  normal = new THREE.Vector3();
  uv = new THREE.Vector2();
  i, j, k, l, m, face = [];
}

function exportObj(object) {
  init();

  object.traverse( function ( child ) {

  	if ( child.isMesh === true ) {
  		parseMesh( child );
  	}

  	if ( child.isLine === true ) {
  		parseLine( child );
  	}

  	if ( child.isPoints === true ) {
  		parsePoints( child );
  	}
  });

  return output;
}

var parseMesh = function ( mesh ) {

  var nbVertex = 0;
  var nbNormals = 0;
  var nbVertexUvs = 0;

  var geometry = mesh.geometry;

  var normalMatrixWorld = new THREE.Matrix3();

  if ( geometry.isBufferGeometry !== true ) {
    console.info('OBJExporter: Root geometry is not of type THREE.BufferGeometry.');
    let geo_uuid = geometry.uuid;
    if (geometry._bufferGeometry) {
      geometry = geometry._bufferGeometry;
    } else {
      console.warn('OBJExporter: No bufferGeometry found. Geometry skipped. UUID: ' + geo_uuid);
      return;
    }
  }

  // shortcuts
  var vertices = geometry.getAttribute( 'position' );
  var normals = geometry.getAttribute( 'normal' );
  var uvs = geometry.getAttribute( 'uv' );
  var indices = geometry.getIndex();

  // name of the mesh object
  output += 'o ' + mesh.name + '\n';

  // name of the mesh material
  if ( mesh.material && mesh.material.name ) {

  	output += 'usemtl ' + mesh.material.name + '\n';

  }

  // vertices

  if ( vertices !== undefined ) {

  	for ( i = 0, l = vertices.count; i < l; i ++, nbVertex ++ ) {

  		vertex.x = vertices.getX( i );
  		vertex.y = vertices.getY( i );
  		vertex.z = vertices.getZ( i );

  		// transform the vertex to world space
  		vertex.applyMatrix4( mesh.matrixWorld );

  		// transform the vertex to export format
  		output += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\n';

  	}

  }

  // uvs

  if ( uvs !== undefined ) {

  	for ( i = 0, l = uvs.count; i < l; i ++, nbVertexUvs ++ ) {

  		uv.x = uvs.getX( i );
  		uv.y = uvs.getY( i );

  		// transform the uv to export format
  		output += 'vt ' + uv.x + ' ' + uv.y + '\n';

  	}

  }

  // normals

  if ( normals !== undefined ) {

  	normalMatrixWorld.getNormalMatrix( mesh.matrixWorld );

  	for ( i = 0, l = normals.count; i < l; i ++, nbNormals ++ ) {

  		normal.x = normals.getX( i );
  		normal.y = normals.getY( i );
  		normal.z = normals.getZ( i );

  		// transform the normal to world space
  		normal.applyMatrix3( normalMatrixWorld ).normalize();

  		// transform the normal to export format
  		output += 'vn ' + normal.x + ' ' + normal.y + ' ' + normal.z + '\n';

  	}

  }

  // faces

  if ( indices !== null ) {

  	for ( i = 0, l = indices.count; i < l; i += 3 ) {

  		for ( m = 0; m < 3; m ++ ) {

  			j = indices.getX( i + m ) + 1;

  			face[ m ] = ( indexVertex + j ) + ( normals || uvs ? '/' + ( uvs ? ( indexVertexUvs + j ) : '' ) + ( normals ? '/' + ( indexNormals + j ) : '' ) : '' );

  		}

  		// transform the face to export format
  		output += 'f ' + face.join( ' ' ) + '\n';

  	}

  } else {

  	for ( i = 0, l = vertices.count; i < l; i += 3 ) {

  		for ( m = 0; m < 3; m ++ ) {

  			j = i + m + 1;

  			face[ m ] = ( indexVertex + j ) + ( normals || uvs ? '/' + ( uvs ? ( indexVertexUvs + j ) : '' ) + ( normals ? '/' + ( indexNormals + j ) : '' ) : '' );

  		}

  		// transform the face to export format
  		output += 'f ' + face.join( ' ' ) + '\n';

  	}

  }

  // update index
  indexVertex += nbVertex;
  indexVertexUvs += nbVertexUvs;
  indexNormals += nbNormals;
}

var parseLine = function ( line ) {
  var nbVertex = 0;

  var geometry = line.geometry;
  var type = line.type;

  if ( geometry.isBufferGeometry !== true ) {

  	throw new Error( 'THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.' );

  }

  // shortcuts
  var vertices = geometry.getAttribute( 'position' );

  // name of the line object
  output += 'o ' + line.name + '\n';

  if ( vertices !== undefined ) {

  	for ( i = 0, l = vertices.count; i < l; i ++, nbVertex ++ ) {

  		vertex.x = vertices.getX( i );
  		vertex.y = vertices.getY( i );
  		vertex.z = vertices.getZ( i );

  		// transform the vertex to world space
  		vertex.applyMatrix4( line.matrixWorld );

  		// transform the vertex to export format
  		output += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\n';

  	}

  }

  if ( type === 'Line' ) {

  	output += 'l ';

  	for ( j = 1, l = vertices.count; j <= l; j ++ ) {

  		output += ( indexVertex + j ) + ' ';

  	}

  	output += '\n';

  }

  if ( type === 'LineSegments' ) {

  	for ( j = 1, k = j + 1, l = vertices.count; j < l; j += 2, k = j + 1 ) {

  		output += 'l ' + ( indexVertex + j ) + ' ' + ( indexVertex + k ) + '\n';

  	}

  }

  // update index
  indexVertex += nbVertex;

}

var parsePoints = function ( points ) {
  var nbVertex = 0;

  var geometry = points.geometry;

  if ( geometry.isBufferGeometry !== true ) {

  	throw new Error( 'THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.' );

  }

  var vertices = geometry.getAttribute( 'position' );
  var colors = geometry.getAttribute( 'color' );

  output += 'o ' + points.name + '\n';

  if ( vertices !== undefined ) {

  	for ( i = 0, l = vertices.count; i < l; i ++, nbVertex ++ ) {

  		vertex.fromBufferAttribute( vertices, i );
  		vertex.applyMatrix4( points.matrixWorld );

  		output += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z;

  		if ( colors !== undefined ) {

  			color.fromBufferAttribute( colors, i );

  			output += ' ' + color.r + ' ' + color.g + ' ' + color.b;

  		}

  		output += '\n';

  	}

  }

  output += 'p ';

  for ( j = 1, l = vertices.count; j <= l; j ++ ) {

  	output += ( indexVertex + j ) + ' ';

  }

  output += '\n';

  // update index
  indexVertex += nbVertex;
}

export { exportObj };
