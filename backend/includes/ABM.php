<?php

error_reporting(1);

session_start();

include_once("../includes/Conexion.php");
include_once("../includes/Funciones.php");

header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if( isset($_POST["tipo"]) && !empty( isset($_POST["tipo"]) ) ) {

	$tipo = $_POST["tipo"];

	if($tipo == "listarProveedores") {
		listarProveedores();
	}
	elseif($tipo == "cargarProveedor") {
		$id = $_POST["id"];
		if(is_numeric($id)) {
			cargarProveedor($id);
		}
	}
	elseif($tipo == "agregarProveedor") {
		$nombre = $_POST["nombre"];
		$direccion = $_POST["direccion"];
		$telefono = $_POST["telefono"];
		agregarProveedor($nombre,$direccion,$telefono);
	}
	elseif($tipo == "editarProveedor") {
		$id = $_POST["id"];
		$nombre = $_POST["nombre"];
		$direccion = $_POST["direccion"];
		$telefono = $_POST["telefono"];
		editarProveedor($id,$nombre,$direccion,$telefono);
	}
	elseif($tipo == "borrarProveedor") {
		$id = $_POST["id"];
		borrarProveedor($id);
	}
	elseif($tipo == "listarProductos") {
		listarProductos();
	}
	elseif($tipo == "cargarProducto") {
		$id = $_POST["id"];
		if(is_numeric($id)) {
			cargarProducto($id);
		}
	}
	elseif($tipo == "agregarProducto") {
		$nombre = $_POST["nombre"];
		$descripcion = $_POST["descripcion"];
		$precio = $_POST["precio"];
		$id_proveedor = $_POST["id_proveedor"];
		agregarProducto($nombre,$descripcion,$precio,$id_proveedor);
		
	}
	elseif($tipo == "editarProducto") {
		$id = $_POST["id"];
		$nombre = $_POST["nombre"];
		$descripcion = $_POST["descripcion"];
		$precio = $_POST["precio"];
		$id_proveedor = $_POST["id_proveedor"];
		editarProducto($id,$nombre,$descripcion,$precio,$id_proveedor);		
	}
	elseif($tipo == "borrarProducto") {
		$id = $_POST["id"];
		borrarProducto($id);		
	}
	elseif($tipo == "listarUsuarios") {
		listarUsuarios();
	}

}

function listarProveedores() {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();

	$sql = $conn->prepare("SELECT id,nombre,direccion,telefono,fecha_registro FROM proveedores");
	$sql->execute();
	$resultado = $sql->fetchAll();
	foreach($resultado as $fila) {
		$data["proveedores"][] = $fila;
	}
	$conexion->cerrar_conexion();
	$data["success"] = true;
	echo json_encode($data);
	exit;
}

function cargarProveedor($id) {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("SELECT id,nombre,direccion,telefono,fecha_registro FROM proveedores WHERE id = :id");
	$sql->bindParam(":id",$id,PDO::PARAM_INT);
	$sql->execute();
	$resultado = $sql->fetch();
	$data["proveedor"] = $resultado;
	$conexion->cerrar_conexion();
	$data["success"] = true;
	echo json_encode($data);
	exit;
}

function agregarProveedor($nombre,$direccion,$telefono) {
	$fecha_registro = fecha_actual();
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("INSERT INTO proveedores(nombre,direccion,telefono,fecha_registro) VALUES(?,?,?,?)");
	$sql->execute([$nombre, $direccion, $telefono, $fecha_registro]);
	$conexion->cerrar_conexion();
	$data["estado"] = 1;
	echo json_encode($data);
	exit;
}

function editarProveedor($id,$nombre,$direccion,$telefono) {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?");
	$sql->execute([$nombre, $direccion, $telefono, $id]);
	$conexion->cerrar_conexion();
	$data["estado"] = 1;
	echo json_encode($data);
	exit;
}

function borrarProveedor($id) {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("DELETE FROM proveedores WHERE id = ?");
	$sql->execute([$id]);
	$conexion->cerrar_conexion();
	$data["estado"] = 1;
	echo json_encode($data);
	exit;
}

//

function listarProductos() {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();

	$sql = $conn->prepare("SELECT prod.id,prod.nombre,prod.descripcion,prod.precio,prod.id_proveedor,prov.nombre AS nombre_proveedor,prod.fecha_registro FROM productos prod, proveedores prov WHERE prod.id_proveedor = prov.id");
	$sql->execute();
	$resultado = $sql->fetchAll();
	foreach($resultado as $fila) {
		$data["productos"][] = $fila;
	}
	$conexion->cerrar_conexion();
	$data["success"] = true;
	echo json_encode($data);
	exit;
}

function cargarProducto($id) {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("SELECT prod.id,prod.nombre,prod.descripcion,prod.precio,prod.id_proveedor,prod.fecha_registro,prov.nombre AS nombre_empresa FROM productos prod, proveedores prov WHERE prod.id_proveedor = prov.id AND prod.id = :id");
	$sql->bindParam(":id",$id,PDO::PARAM_INT);
	$sql->execute();
	$resultado = $sql->fetch();
	$data["producto"] = $resultado;
	$conexion->cerrar_conexion();
	$data["success"] = true;
	echo json_encode($data);
	exit;
}

function agregarProducto($nombre,$descripcion,$precio,$id_proveedor) {
	$fecha_registro = fecha_actual();
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("INSERT INTO productos(nombre,descripcion,precio,id_proveedor,fecha_registro) VALUES(?,?,?,?,?)");
	$sql->execute([$nombre, $descripcion, $precio, $id_proveedor, $fecha_registro]);
	$conexion->cerrar_conexion();
	$data["estado"] = 1;
	echo json_encode($data);
	exit;
}

function editarProducto($id,$nombre,$descripcion,$precio,$id_proveedor) {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, id_proveedor = ? WHERE id = ?");
	$sql->execute([$nombre, $descripcion, $precio, $id_proveedor, $id]);
	$conexion->cerrar_conexion();
	$data["estado"] = 1;
	echo json_encode($data);
	exit;
}

function borrarProducto($id) {
	$data = array();
	$conexion = new Conexion();
	$conexion->abrir_conexion();
	$conn = $conexion->retornar_conexion();
	$sql = $conn->prepare("DELETE FROM productos WHERE id = ?");
	$sql->execute([$id]);
	$conexion->cerrar_conexion();
	$data["estado"] = 1;
	echo json_encode($data);
	exit;
}

?>