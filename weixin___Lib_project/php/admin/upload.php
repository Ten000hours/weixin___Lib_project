<?php
//1.��ȡ�ϴ��ļ���Ϣ
$upfile=$_FILES["file"];
//�������������
$typelist=array("image/jpeg","image/jpg","image/png","image/gif");
$path="/yjdata/www/www/img/";//����һ���ϴ����Ŀ¼
//2.�����ϴ��ļ��Ĵ����
if($upfile["error"]>0){
	switch($upfile['error']){//��ȡ������Ϣ
		case 1:
			$info="1�ϴ����ļ������� php.ini��upload_max_filesize ѡ���е����ֵ.";
			break;
		case 2:
			$info="2�ϴ��ļ���С������html��MAX_FILE_SIZE ѡ���е����ֵ.";
			break;
		case 3:
			$info="3�ļ�ֻ�в��ֱ��ϴ�";
			break;
		case 4:
			$info="4û���ļ����ϴ�.";
			break;
		case 6:
			$info="5�Ҳ�����ʱ�ļ���.";
			break;
		case 7:
			$info="6�ļ�д��ʧ�ܣ�";break;
		}	
	die("�ϴ��ļ�����,ԭ��:".$info);
}
//3.�����ϴ��ļ���С�Ĺ��ˣ��Լ�ѡ��
if($upfile['size']>100000){
die("7�ϴ��ļ���С��������");
}
//4.���͹���
if(!in_array($upfile["type"],$typelist)){
	die("8�ϴ��ļ����ͷǷ�!".$upfile["type"]);
}
//5.�ϴ�����ļ�������(�����ȡһ���ļ���)
$fileinfo=pathinfo($upfile["name"]);//�����ϴ��ļ�����
do{
	$newfile=date("YmdHis").rand(1000,9999).".".$fileinfo["extension"];
}while(file_exists($path.$newfile));
//6.ִ���ļ��ϴ�
//�ж��Ƿ���һ���ϴ����ļ�
if(is_uploaded_file($upfile["tmp_name"])){
//ִ���ļ��ϴ�(�ƶ��ϴ��ļ�)
	if(move_uploaded_file($upfile["tmp_name"],$path.$newfile)){
		echo 1;
		echo $newfile;
	}else{
		die("10�ϴ��ļ�ʧ�ܣ�");
	}
}
else{
	die("����һ���ϴ��ļ�!");
}
