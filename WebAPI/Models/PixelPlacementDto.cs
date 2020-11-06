using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class PixelPlacementDto //DTO = Data Transfer Object
    {
        //public string ClientConnectionString { get; set; } //IP of connected user
        public int X { get; set; } //x-coord
        public int Y { get; set; } //y-coord
        public char Color { get; set; }
        //private DateTime obj { get; set; } //time stamp object.
    }
}
