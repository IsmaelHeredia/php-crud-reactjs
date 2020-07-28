<?php

function fecha_actual() {
  date_default_timezone_set("America/Argentina/Cordoba");
  $fecha = date("Y-m-d", time());
  return $fecha;
}

?>