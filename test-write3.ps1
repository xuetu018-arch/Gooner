Add-Type -TypeDefinition 'using System; public class W { public static string[] List() { return new string[] { "Hello|World", "Foo|Bar" }; } }'; [W]::List()
