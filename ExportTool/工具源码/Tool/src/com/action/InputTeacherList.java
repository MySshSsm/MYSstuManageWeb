package com.action;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import utils.DB;
import utils.MD5;

import com.bean.BeanStudentGrade;
import com.bean.BeanTutor;


import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.*;


/**
 * 此类用来批量创建导师帐号
 * 要导入的信息包括：老师姓名，所属学院，专业方向
 *  配置文件说明：
 *     tutor.xls(文档须为97-03版本excel）
 *     数据有4列：
 *        第一列为老师姓名，要求不超过15个汉字；
 *        第二列为所属学院，原则上导入的教师所属的学院是在『土木工程学院，机械工程学院，电气工程学院，
 *            信息科学与技术学院，交通运输与物流学院，材料科学与工程学院，力学与工程学院』中选的，
 *            如若有其他情况，则填为“其他”；
 *        第三列为专业方向，要求不超过50字;
 *        第四列为EMAIL，EMAIL用来作登录名用
 *     
 *     鉴于发放账户数据方法的可行性，导师新建帐号的密码不再采用随机密码，而是统一初始密码为12345，导师拿到账户后可自行修改密码。
 *  
 *  操作说明：
 *     1.通过getTutorSheet()方法获取excel文件中的sheet
 *     2.通过getTutorInfo()方法获取导师相关信息，返回一个包含所有信息的列表    
 *     3.通过putTutorInfo()方法将相关账户信息存入数据库中
 *  
 * @author li
 * @version 1.0
 */
public class InputTeacherList {
     private static final String TUTORFILE = "tutor.xls";
     private static final String TUTORACC = "`_Login_Info`";
     private static final String TUTORINFO = "`_User_Tutor_Info`";
     private static final String INITPASS = "12345";
     
     private static Connection conn;
     private static PreparedStatement pre;
     private static ResultSet res;
     
     /**
      * 从excel中获得tutor的sheet
      * @return
      */
     private static Sheet getTutorSheet() {
 		try {
 			Workbook book = Workbook.getWorkbook(new File(TUTORFILE));
 			Sheet sheet = book.getSheet("Sheet1");
 			return sheet;
 		} catch (BiffException e) {
 			e.printStackTrace();
 		} catch (IOException e) {
 			e.printStackTrace();
 		}
 		return null;
 	}

     /**
      * 从excel中读取老师信息，封装到一个arraylist中
      * @return 
      */
    public static ArrayList<BeanTutor> getTutorInfo()
    {
    	ArrayList<BeanTutor> list = new ArrayList<BeanTutor>();
    	BeanTutor item;
    	Sheet sheet = getTutorSheet();
    	int rows = sheet.getRows();
    	for (int i = 1; i< rows; i++)
    	{
    		item = new BeanTutor();
    		item.setName(sheet.getCell(0, i).getContents());
    		item.setCollege(sheet.getCell(1, i).getContents());
    		item.setMajor(sheet.getCell(2, i).getContents());
    		item.setEmail(sheet.getCell(3, i).getContents());    	
    		list.add(item);   		
    	}
    	return list;
    }
    
   /* public static boolean putTutorLogin(ArrayList<BeanTutor> list)
    {
    	 boolean flag = true;
  		boolean defaultValue = false;
  		conn = DB.getConnection(); 		
  		
  		try {
  			defaultValue = conn.getAutoCommit();
  			conn.setAutoCommit(false);
  			conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
  			
  		
  			for (BeanTutor item : list) {
  				// item.setId(item.getId());
  				pre = DB.prepare(conn, sql1);
  				pre.setString(1, item.getEmail());
  				pre.setString(2, item.getName());
  				pre.setString(3, INITPASS);
  				pre.setString(4, item.getEmail());
  				pre.setInt(5, 1); //AccTyp 为1 代表老师
  				pre.setInt(6, 1);
  				pre.execute();
  				DB.close(pre);
  			}
  			conn.commit();
  		} catch (SQLException e) {
  			flag = false;
  			try {
  				conn.rollback();
  			} catch (SQLException e1) {
  				e1.printStackTrace();
  			}
  			e.printStackTrace();
  		} finally {
  			try {
  				conn.setAutoCommit(defaultValue);
  			} catch (SQLException e) {
  				e.printStackTrace();
  			}
  		}
  		close();
  		return flag;
    }*/
     
    /**
     * 将老师数据存入到数据库中
     * @param list
     * @return
     */
     public static boolean putTutorInfo(ArrayList<BeanTutor> list)
     {
    	 boolean flag = true;
 		boolean defaultValue = false;
 		conn = DB.getConnection(); 	
 		String sql1 = "";
 		String sql2 = "";
 		try {
 			defaultValue = conn.getAutoCommit();
 			conn.setAutoCommit(false);
 			conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
 			sql1 = "INSERT INTO " + TUTORACC + " (`UserId`, `UserName`,`pwd`,`E-Mail`,`AccTyp`,`IsVery`) VALUES (?,?,?,?,?,?)";
 			sql2 = "INSERT INTO " + TUTORINFO + " (`UserId`, `college`, `major`) VALUES (?, ?, ?)";
 		
 			for (BeanTutor item : list) {
 				
 				pre = DB.prepare(conn, sql1); 				
  				pre.setString(1, item.getEmail());
  				pre.setString(2, item.getName());
  				pre.setString(3, MD5.getMD5ofStr(INITPASS));  				
  				pre.setString(4, item.getEmail());  				
  				pre.setInt(5, 1); //AccTyp 为1 代表老师
  				pre.setInt(6, 1);
  		//		System.out.println(pre);
  			//	System.out.println(pre);
  				pre.execute();  			
  				DB.close(pre);
 				
 				pre = DB.prepare(conn, sql2);
 				pre.setString(1, item.getEmail());
 				pre.setString(2, item.getCollege());
 				pre.setString(3, item.getMajor());
 //				System.out.println(pre);
 				pre.execute();
 				DB.close(pre);
 			}
 			conn.commit();
 		} catch (SQLException e) {
 			flag = false;
 			try {
 				conn.rollback();
 			} catch (SQLException e1) {
 				e1.printStackTrace();
 			}
 			e.printStackTrace();
 		} finally {
 			try {
 				conn.setAutoCommit(defaultValue);
 			} catch (SQLException e) {
 				e.printStackTrace();
 			}
 		}
 		close();
 		return flag;
     }
     
    
     
     /**
 	 * 关闭数据库连接
 	 */
 	private static void close() {
 		try {
 			DB.close(res);
 			DB.close(pre);
 			DB.close(conn);
 		} catch (SQLException e) {
 			e.printStackTrace();
 		}
 	}

     
}
