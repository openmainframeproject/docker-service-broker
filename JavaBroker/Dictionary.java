/*****************************************************************************************
/* November 4th, 2013
/* Filename: Dictionary.java
/*****************************************************************************************
/*        	                       DICTIONARY MODULE
/*
/* Dictionary module serves as an external program. It is part of the Service Stub's layer 
/* Dictionary module receives the English word from the Service Brocker, finds the
/* translate foreign word, and displays the output. 
/*
/*****************************************************************************************
/* Input: English word 
/* Output: foreign word 
/*****************************************************************************************
/* 		Maintenance log
/*****************************************************************************************
/* FIX001 9/16/2013 
/* Revise the output by adding Word Not Found option 
/****************************************************************************************/

import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

/*****************************************************************************************
/*                                	Dictionary.class
/* Dictionary class contains the main method that reads a text file, converts the words in
/* text file into a two dimensional array for search purposes, compares the English word 
/* to the target word inside the array, and displays the result. 
/*****************************************************************************************
/* Input: a single English word
/* Output: a single foreign word
/****************************************************************************************/

public class Dictionary
{
	public static void main(String[]args) throws FileNotFoundException
	{
		String english = args[0];// get the English word 
		String[][] word = new String[15][2]; // create two dimensional array
		String filename = "dictionary.txt"; // assign the text filename
		Scanner s = new Scanner(new File(filename)); // create Scanner and File
		
		/*********************************************************************************
		/* This for loop assigns value(s) to a two dimensional "word" array.
		/* Each iteration reads a line from "dictionary.txt" file, splits multiple Strings 
		/* within each line, and assigns individual value to the "word" array. 
		/********************************************************************************/
		for (int i = 0; i < word.length; i++) 
		{
			String line = s.nextLine(); // read a line
			
			String[] splited = line.split("\\s"); // split multiple string and assign it 
			// to the "splited" array
			
			for (int j = 0; j < word[i].length; j++)
				word[i][j] = splited[j]; // assign value to the "word" array 
			// end for loop
			
		}// end for loop
		
		String result = ""; // assign an empty String for the result variable
		
		/*********************************************************************************
		/* This for loop accesses the array to find the target word if there is any 
		/********************************************************************************/
		for (int i = 0; i < word.length; i++)
		{	
			/*****************************************************************************
			/* This if statement only executes if the target word is found. 
			/****************************************************************************/
			if (english.equalsIgnoreCase(word[i][0])) 
			{
				result = word[i][1]; // word found and assign the value to result variable
				i = word.length; // it forces to quit the for loop 
			}// end if statement
			
		}// end for loop
		
		/*********************************************************************************
		/* This if else statement checks the result and print out the correct value based 
		/* on the condition.
		/********************************************************************************/
		if (result.length() == 0)
			System.out.println("Word Not Found");
		else
			System.out.println(result);
		// end if else statement
		
	}// end main method
	
} //end class Dictionary
	
