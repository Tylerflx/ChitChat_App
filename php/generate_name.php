<?php include("./db_connect.php");



$query ="SELECT  u.z_no, u.f_name, u.l_name, u.user_type,c.course_ID, c.course_name
FROM users u
INNER JOIN course c ON u.z_no = c.z_no";

$result = $db->query($query) or die($db->error);
$parsedResult = array();
while($row = $result->fetch_assoc()){
    array_push($parsedResult, $row);
    //echo "number of rows: " . $result->num_rows;
}

echo json_encode($parsedResult);
?>