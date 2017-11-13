/*****************************************************************************************
/* November 4th, 2013
/* Filename: Server.java
/*****************************************************************************************
/*        	                       SERVER MODULE
/*
/* Server module is part of the Enterprise Service Bus that create ServerSocket and Socket
/* It creates a thread to each client as a daughter task. 
/*****************************************************************************************
/* Input: signal from client through socket
/* Output: accept the client through socket 
/*****************************************************************************************
/* 		Maintenance log
/*****************************************************************************************
/* FIX001 11/04/2013 Programmer
/* Create the Server module to accept multiple client and create a threat for each client
/****************************************************************************************/

import java.net.ServerSocket;
import java.net.Socket;
import java.io.IOException;

/*****************************************************************************************
/*                                	Server.class
/* Server class contains the main method that create client-server connection, accepts
/* the connection from client(s), and creates a thread for each client. The Server class is 
/* a parent class of SessionManager class. 
/*****************************************************************************************
/* Input: signal from client through socket
/* Output: accept the client through socket 
/****************************************************************************************/
public class Server
{
	public static void main(String[] args) throws IOException
	{
		/*********************************************************************************
		/* Creates a Server Socket with the specific port to listen if there is client
		/* request a connection.
		/********************************************************************************/
		int listeningPort = 2004;
		boolean isConnect = true;
		int count = 0;
		try
		{
			ServerSocket ss = new ServerSocket(listeningPort);
			while (isConnect)
			{
				/*************************************************************************
				/* This while loop allows the server to accept multiple clients and create
				/* a thread for each client after the connection is established
				/************************************************************************/
				count++;
				Socket socket = ss.accept();
				SessionManager sm = new SessionManager(socket);
				Thread t = new Thread(sm);	
				t.start();	
				System.out.println("Thread " + count + " run successfully");
			} 
		}//try
		
		catch (IOException ioe)
		{
			System.out.println("IOException on Server socket listen: " + ioe);
			ioe.printStackTrace();
		}//catch
		
		
	}// main method
}// class Server

