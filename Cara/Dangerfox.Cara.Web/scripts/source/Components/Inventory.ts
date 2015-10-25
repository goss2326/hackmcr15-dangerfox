module Dangerfox.Cara.Components
{
    export class Inventory
    {
        public inventory: Support.Collection<String>;

        constructor()
        {   
        }

        public Add(item : String)
        {
            this.inventory.Add(item);
        }

        public UseItem(usedItem : String)
        {
            for (var n = 0; n <= this.inventory.Count(); n++)
            {
                var item = this.inventory.GetItem(n);
                if (item == usedItem)
                {
                    this.inventory.Delete(n);
                }
            } 
        }

    }

    
}