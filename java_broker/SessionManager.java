/*****************************************************************************************
/* November 4th, 2013
/* Filename: SessionManager.java
/*****************************************************************************************
/*        	                   SESSIONMANAGER MODULE
/*
/* SessionManager module is part of Enterprise Service Bus that implements Runnable Object
/* and executes task(s) for each client. 
/*****************************************************************************************
/* Input: String input from Client
/* Output: String output from Service Broker 
/*****************************************************************************************
/* 		Maintenance log
/*****************************************************************************************
/* FIX001 11/04/2013 
/* Implements Runnable interface to handle each thread
/****************************************************************************************/

import java.net.Socket;
//import java.io.ObjectOutputStream;
//import java.io.ObjectInputStream;
//import java.io.IOException;
//import java.util.Scanner;
//import java.io.File;
//import java.io.FileNotFoundException;
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
import java.io.*;
/*****************************************************************************************
/*                              SessionManager.class
/* SessionManager class contains a constructor that accepts one parameter: socket
/* It implements run() method from Runnable 
/*****************************************************************************************
/* Input: String input from Client
/* Output: String output from Service Broker 
/****************************************************************************************/
public class SessionManager implements Runnable
{
	private Socket socket;
	private String input;
	
	public SessionManager(Socket socket)
	{
		/*********************************************************************************
		/* Constructor that accepts one parameter: socket
		/********************************************************************************/
		this.socket = socket;
	}// sessionManager constructor
	
	public void run()
	{
		/*********************************************************************************
		/* Run() method is a method from Runnable class that execute the thread for each 
		/* client 
		/********************************************************************************/
		input = "";
		try
		{
			ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
			ObjectInputStream in = new ObjectInputStream(socket.getInputStream());
			
			input = (String)in.readObject();// read from socket
			
			while (!input.equals("-1"))
			{
				/*************************************************************************
				/* This while loop creates Process Object to execute the external module 
				/* and pass the input from client to the external module 
				/************************************************************************/
				//Process p = Runtime.getRuntime().exec("java -jar ServiceBroker.jar " + input);
				Process p = Runtime.getRuntime().exec("java ServiceBroker " + input);
				
				BufferedReader inResult = new BufferedReader(new InputStreamReader(p.getInputStream()));
			
				String result = "";
				//result = inResult.readLine();
				
				while ((result = inResult.readLine())!= null ) { //&& result != "task complete") {
				
					//result = inResult.readLine();
					//result = result.trim();
					out.writeObject(result); // write to client in socket 
					out.flush();
					//System.out.println("task complete1");
			
				}
				
				//out.flush();// flush any string in buffered reader
				input = (String)in.readObject();	
				//System.out.println("task complete");
							
			}//while
			
				
				out.writeObject("Good bye"); 
				socket.close(); // close Socket
				in.close(); // close ObjectInputStream
				out.close(); // close ObjectOutputStream
		}//try
		
		catch(ClassNotFoundException cnfe)
		{
			System.out.println("ClassNotFoundException on SessionManager socket " +  cnfe);
			cnfe.printStackTrace();
		}//catch
		catch(IOException ioe)
		{
			System.out.println("IOException on SessionManager socket " +  ioe);
			ioe.printStackTrace();
		}//catch
	}//run method
}// class SessionManager
