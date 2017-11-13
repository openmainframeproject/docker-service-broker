/*****************************************************************************************
/* November 4th, 2013
/* Filename: ServiceBroker.java
/*****************************************************************************************
/*        	                       SERVICEBROKER MODULE
/*
/* This module is part of the Service Broker. It looks up the file and finds the 
/* correspond service number, then executes the external module based on the service  
/* number. 
/*****************************************************************************************
/* Input: String input from the SessionManager module
/* Output: foreign word for 01, "Service 2 called" for 02, and "Service 3 called" for 03, 
/* and "Service is not available" for unlisted service
/*****************************************************************************************
/* 		Maintenance log
/*****************************************************************************************
/* FIX001 11/04/2013 
/* Creates Service Broker layer that calls the specific external module
/****************************************************************************************/
import java.util.Scanner;
//import java.io.File;
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
import java.io.*;

public class ServiceBroker
{
	public static void main(String[]args) throws Exception
	{
		/*********************************************************************************
		/* This main method reads a database file for service number, parses the parameter,
		/* and creates Process Object to call the external module based on the service 
		/* number
		/********************************************************************************/
		String filename = "servData.txt"; 
		Scanner scan = new Scanner(new File(filename));
		
		String[][] serviceData = new String[3][2];
		String str = "";

		for (int i = 0; i < serviceData.length; i++)
		{
			/*****************************************************************************
			/* This for loop scans the strings from a file and store them in a two
			/* dimensional array
			/****************************************************************************/
			str = scan.nextLine();
			String[] splitted = str.split(" ");
			for (int j = 0; j < serviceData[i].length; j++)
				serviceData[i][j] = splitted[j];		
		}//for
		
		String serviceNum = args[0];
		String param = "";
		if (args.length == 1)
			param = "";
		else
			param = args[1] + " " + args[2];
			
		System.out.println(param);
		
		int count = 0;			
		for (int i = 0; i < serviceData.length; i++)
		{	
			/*****************************************************************************
			/* This for loop goes through the two dimensional array created above, 
			/* find the target service number, and calls the target service module
			/****************************************************************************/
			if (serviceNum.equals(serviceData[i][0]))
			{	

				try{
				
					//Process p = Runtime.getRuntime().exec("whoami");// + serviceData[i][1] + " " + param);
					//Process p = Runtime.getRuntime().exec("sudo -i bitcoind getinfo");// + serviceData[i][1] + " " + param);
				
					Process p = Runtime.getRuntime().exec(serviceData[i][1] + " " + param);
					//Process p = Runtime.getRuntime().exec("java Service2");// + input);	
				
											
					BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
					
					String line = "";
					//line = in.readLine();
					
					while ((line = in.readLine())!= null) {
						//line = in.readLine();
						//line = line.trim();
						System.out.println(line); // write to client in socket 
						
					}
					//System.out.println("task complete");
			
								
				}
				catch(Exception e)
				{
					System.out.println("IOException on Don't know what it is " +  e);
					e.printStackTrace();
				}
			}// if else
			
			
			
			
			else
				count++;
		}//for loop
		
		if (count == serviceData.length)
			System.out.println("Service " +  args[0] + " is not available");
			
		System.out.println("EOF");
			
	}// main method

}// class ServiceBroker
