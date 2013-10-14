using System;
using System.Threading;

using Nancy;
using Nancy.Hosting.Self;

namespace NancyDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            NancyHost host = new NancyHost(new Uri("http://localhost:8888"));
            host.Start();

            Console.ReadKey();

            host.Stop();
        }
    }
}