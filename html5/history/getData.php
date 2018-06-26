<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$page = $_GET['page'];
if($page == 'one') {
  $data = '111';
} elseif ($page == 'two') {
  $data = '222';
} elseif ($page == 'three') {
  $data = '333';
}
echo "{$data}";
