<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>����Ա������Ϣ��ʾ</title>
</head>
<body>
	<table border="0" width="100%" cellspacing="0" cellpadding="0"
		height="100%">
		<tr>
			<td valign="top" height="8"></td>
		</tr>

		<tr>
			<td valign="top">
				<table border="0" width="100%" cellspacing="0" cellpadding="0"
					height="100%" id="table3" style="border: 1px solid #D7D7D7"
					bgcolor="#F7F7F7">
					<tr>
						<td valign="top">
							<div align="center">
								<table border="0" width="98%" cellspacing="0" cellpadding="0"
									height="100%">
									<tr>
										<td height="5"></td>
									</tr>
									<tr>
										<td valign="top">
										  <form action="User!editsub" method="post">
											<table border="0" width="100%" cellpadding="2" id="table5">
												<tr><td height="28" bgcolor="#F3E9F8" style="line-height: 150%">��ע�⣺������˶����ѧ����Ϣ��������������ڹ涨ʱ�����������ύ�޸����룬�޸����������֤������ϵѧԺ�������Ρ�</td></tr>
												<tr><td height="10"></td></tr>
											</table> <s:set name="info" value="adminInfo" />

											<table border="1" width="100%" bordercolorlight="#808080" cellspacing="0" cellpadding="0" bordercolordark="#F7F7F7" id="table6">
												<tr><td height="50" colspan="5"><p align="center"><b><font style="font-size: 20px;" face="���ķ���">���Ͻ�ͨ��ѧé����ѧԺ��վ����Ա������Ϣ</font></b></p></td></tr>

												<tr>
													<td height="28" width="16%" bgcolor="#F1F5F5">&nbsp;��&nbsp;&nbsp;&nbsp; ��</td>
													<td height="28" width="18%"><s:property value="#info.UserName" /></td>

													<td height="28" width="16%" bgcolor="#F1F5F5">&nbsp;��&nbsp;&nbsp;&nbsp; ��</td>
													<td height="28" width="30%"><s:property value="#info.gender" /></td>
												</tr>

												<tr>
													<td height="28" width="16%" bgcolor="#F1F5F5">&nbsp;�����ʼ�</td>
													<td height="28" width="18%">
													  <input name="Email" value="<s:property value="#info.email" />" type="text" />
													</td>

													<td height="28" width="16%" bgcolor="#F1F5F5">&nbsp;���˵绰</td>
													<td height="28" width="30%">
													  <input name="phone" value="<s:property value="#info.phone" />" type="text" />
													</td>
												</tr>

												<tr>
													<td height="28" width="16%" bgcolor="#F1F5F5">&nbsp;����ְ��</td>
													<td height="28" width="70%" colspan="3"><s:property value="#info.job" /></td>
												</tr>
											</table>
											<input type="submit" value="�ύ" />
										  </form>
										</td>
									</tr>
									<tr><td height="12"></td></tr>
								</table>
							</div></td>
					</tr>
				</table></td>
		</tr>

		<tr>
			<td valign="top" height="8"></td>
		</tr>
	</table>
</body>
</html>
