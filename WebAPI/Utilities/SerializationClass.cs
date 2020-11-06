using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.ObjectModel;
using System.Text.Json;
using WebAPI.Models;

using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace WebAPI.Models
{
    public class SerializationClass
    {
        public string JsonSerialize(PixelPlacement pixel)
        {
            PixelPlacement placement = pixel;
            string json = JsonConvert.SerializeObject(placement);
            //placement = d;
            //JsonSerializer jSe = new JsonSerializer();
            //if (File.Exists(filepath))
            //{
            //    File.Delete(filepath);
            //}
            //StreamWriter sw = new StreamWriter(filepath);
            //JsonWriter jsonWriter = new JsonTextWriter(sw);

            //jSe.Serialize(jsonWriter, d);
            //jsonWriter.Close();
            //sw.Close();
            return json;
        }

        public PixelPlacement JsonDeserialize (string json)
        {

            var deserializedPlacement = JsonConvert.DeserializeObject<PixelPlacement>(json);
            


            //ObservableCollection<PixelPlacement> obj = null;
            //JsonSerializer jsonSerializer = new JsonSerializer();

            //JsonReader jsonReader = new JsonTextReader(JsonString);
            //obj = jsonSerializer.Deserialize<ObservableCollection<PixelPlacement>>(jsonReader);
            //jsonReader.Close();




            return deserializedPlacement;
        }


    }
}