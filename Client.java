/*****************************************************************************************
/* November 4th, 2013
/* Filename: Client.java
/*****************************************************************************************
/*        	                       CLIENT MODULE
/*
/* This module is part of the Enterprise Service Bus that requests connection to the server
/* Client module prompts the user for a service number and another info if need it,
/* then expects an output from the server and printout the result.  
/*****************************************************************************************
/* Input: 01 <English word>, 02, 03
/* Output: foreign word for 01, "Service 2 called" for 02, and "Service 3 called" for 03
/*****************************************************************************************
/* 		Maintenance log
/*****************************************************************************************
/* FIX001 11/04/2013 
/* Create a Client program to prompt multiple services
/****************************************************************************************/

import java.util.Scanner;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.net.Socket;

/*****************************************************************************************
/*                                	Client.class
/* Client class contains the main method that prompts the user input, creates the 
/* connection between client (Client module) and server (external module) through 
/* socket, reads and writes from the socket, and displays the result to the screen and 
/* to a file.
/*  
/*****************************************************************************************
/* Input: 01 <English word>, 02, 03
/* Output: foreign word for 01, "Service 2 called" for 02, and "Service 3 called" for 03
/****************************************************************************************/

public class Client
{
	public static void main(String []args) throws IOException, ClassNotFoundException
	{
		/*********************************************************************************
		/* Creates client-server connection. This connection requires IP and port.
		/********************************************************************************/
		//String serverAddress = "127.0.0.1"; // server address (IP address)
		String serverAddress = "104.131.178.99"; // server address (IP address) - Bit coin
		//String serverAddress = "104.236.206.209"; // database
		
		int serverPort = 2004; // port number
		Socket socket = new Socket(serverAddress, serverPort);
		
		/*********************************************************************************
		/* Creates read-write object to send and receive message between client-server  
		/* through the socket
		/********************************************************************************/
		ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
		ObjectInputStream in = new ObjectInputStream(socket.getInputStream());	
		Scanner scan = new Scanner(System.in); //create a Scanner object	
		PrintWriter output = new PrintWriter(new BufferedWriter(new FileWriter("output.txt")));
		
		System.out.print("Enter input: ");
		String input = scan.nextLine(); 
		input = input.trim();
		while (!input.equals("-1"))
		{
			//modify
	
			
			while (input.length() > 0){
			
				
				/*****************************************************************************
				/* This while loop is to keep the connection with the server until the user 
				/* enter -1 to break out the loop and execute the next command.
				/****************************************************************************/
				out.writeObject(input);
				out.flush();// flush any string in buffered reader
			
				String line = null; // variable for receiving input from the socket
		
				line = (String)in.readObject();
				//System.out.println(line);
				//System.out.println(line.length());
				String x ;
				//x= line.substring(0,3);
				
				while (!line.equals("EOF")) {
					//line = line.substring(0,3);
					
					System.out.println(line); // display the output to the screen
					//System.out.println(x);
				//System.out.println("get this1");
				//System.out.println(line.length());
				
				line = (String)in.readObject();
				//System.out.println("get this2");
				//x= line.substring(0,3);

				}
				System.out.print("Enter input a: ");
				input = scan.nextLine(); 

			 // print the output to the file
			 
			}//end modify
			
		}
		
		out.writeObject(input);
		System.out.println((String)in.readObject());
   		out.close(); // close the ObjectOutputStream
        in.close(); // close the  ObjectInputStram 
        socket.close(); // close the Socket
        output.close(); // close ts = s.replaceAll("\\r", "");he FileWriter
        
	}// end main method
	
}// end Client class
