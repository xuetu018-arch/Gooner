Add-Type -TypeDefinition @"using System;
public class W {
  public static void List() {
    Console.WriteLine("Hello|World");
  }
}"@; [W]::List()
