using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Hubs
{
    public class GridHub : Hub
    {
        public async Task PlacePixel(Int32 x, Int32 y, char color)
        {
            await Clients.All.SendAsync("SetPixel", x, y, color);
        }
    }
}
