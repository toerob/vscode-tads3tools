



 









 













class Lister: object
     








    show(lst, paraCnt, paraBrk = true)
    {
         
        lst = lst.subset({ o: listed(o) });
        
         
        if (lst.length() > 0)
        {
             
            lst = lst.sort(nil, { a, b: listOrder(a) - listOrder(b) });
            
             



            local pl = (lst.length() > 1 || lst[1].plural);
            
             
            showListPrefix(lst, pl, paraCnt);
            
             
            showList(lst, pl, paraCnt);
            
             
            showListSuffix(lst, pl, paraCnt);
            
             
            if(paraBrk)
                "<.p>";
        }
        else
            showListEmpty(paraCnt);
    }
    
    showListPrefix(lst, pl, paraCnt)  { }
    
    showListSuffix(lst, pl, paraCnt)  { }
    
    showListEmpty(paraCnt)  { }
    
     
     



    listed(obj) { return obj.listed; }
    
     





    listOrder(obj) { return obj.listOrder; }
    
    
    
     



    buildList(lst)
    {
        local str = (outputManager.curOutputStream).captureOutput({: show(lst, 0, nil) });
        
        return str;
    }
    
;

 





class ItemLister: Lister
    
     




    show(lst, parent, paraBrk = true)
    {
         
        inherited(lst, parent, paraBrk);
        
         
        foreach(local cur in lst)
        {
            if(listed(cur))
            {
                cur.mentioned = true;
                cur.noteSeen();
            }
        }        
    }
    
    showList(lst, pl, parent)   
    {    
        lst = findListGroups(lst);
        
         



        if(groupTab.getEntryCount() == 0)
            showSimpleList(lst);
        
         
        else
            showComplexList(lst, pl, parent);
    }
    
     



    showSimpleList(lst)     {  }
    
     
    groupTab = nil
    
    findListGroups(lst)
    {
         
        groupTab =  new LookupTable;
        
         




        foreach(local item in lst)
        {
            foreach(local grp in valToList(item.listWith))
                groupTab[grp] = valToList(groupTab[grp]) + item;                    
        }        
      
         
        local grpList = groupTab.keysToList();
        
         



        foreach (local grp in grpList)
        {
            if(groupTab[grp].length < grp.minGroupSize)
                groupTab.removeElement(grp);
        }
        
         



        if(groupTab.getEntryCount() == 0)
            return lst;
        
         



        grpList = groupTab.keysToList().sort(nil, {a, b: b.priority + groupTab[b].length - 
                                             a.priority - groupTab[a].length});
        
        local listed = [];
        
         



        foreach(local grp in grpList)
        {
             
            local items = groupTab[grp];
            
             



            items = items.subset({x: listed.indexOf(x) == nil});
            
             
            groupTab[grp] = items;                       
                  
             



            if(items.length < grp.minGroupSize)
                groupTab.removeElement(grp);
            
             
            else
                listed = listed.appendUnique(items); 
        }
        
         



        lst = lst - listed + groupTab.keysToList();
        
         
        lst = lst.sort(nil, {a, b: a.listOrder - b.listOrder});
        
         
        return lst;
    }
    
     
    showComplexList(lst, pl, parent)
    {
         
        local len = lst.length();
        
         
        for(local i = 1, local item in lst;; ++ i)    
        { 
             
            if(i == len && i > 1)
                message('list and', nil);
            
             
            local punct = ', ';
            
             
            if(item.ofKind(Thing))
            {                
                "<<listName(item)>>";
            }
            
             



            if(item.ofKind(ListGroup))
            {
                item.showList(self, groupTab[item]);
                punct = '; ';
            }
            
             
            if(i < len)
                say(punct);
        }   
            
    }
    
     



    contentsListedProp = &contentsListed
    
     



    subContentsListedProp = &contentsSublisted 
    
    
     



    listRecursively = ((libGlobal.curActor) == (libGlobal.playerChar))   
;


 


lookLister: ItemLister
     
    listed(obj) { return obj.lookListed && !obj.isHidden; }
;

 



lookContentsLister: ItemLister
     
    listed(obj) { return obj.lookListed && !obj.isHidden; }
    
    contentsListedProp = &contentsListedInLook
;

 


inventoryLister: ItemLister
     
    listed(obj) { return obj.inventoryListed && !obj.isHidden; }
;

 
wornLister: ItemLister
      
    listed(obj) { return obj.inventoryListed && !obj.isHidden; }
;

 


inventoryTallLister: ItemLister
     
    listed(obj) { return obj.inventoryListed && !obj.isHidden; }
    
     showList(lst, parent, paraBrk = true)
    {
         
        showContentsTall(lst, parent, paraBrk);
        
        
         
        indentLevel = 1;   
        
    }
    
    
     




    showContentsTall(lst, parent, paraBrk = true) 
    {
        foreach(local cur in lst)
        {
             
            for(local i in 1..indentLevel)            
                "\\t";
            
             
            say(listName(cur));
            
             
            "\\n";
            
             
            cur.mentioned = true;
            cur.noteSeen();  
            
             



            if(listRecursively && indentLevel < maxIndentLevel)
            {
                 



                local subList = (cur.contType == In && !cur.canSeeIn) 
                    ? [] : cur.contents.subset({o: listed(o) });
                
                  
                if(cur.remapIn && cur.remapIn.canSeeIn)
                    subList += cur.remapIn.contents.subset({o: listed(o) });
                
                  
                if(cur.remapOn)
                    subList += cur.remapOn.contents.subset({o: listed(o) });
                
                
                 



                if(subList.length > 0)
                {
                     
                    indentLevel++;
                    
                     
                    subList = subList.sort(true, {x, y: y.listOrder - x.listOrder});
                    
                     
                    showContentsTall(subList, cur, paraBrk);
                    
                     
                    indentLevel-- ;
                    
                }
            }
        }
        
    }    
    
    
     



    listName(o)
    {
         





        
        local ssl = showSubListing;
        
        showSubListing = nil;
        
        local lnam = inherited(o);
        
        showSubListing = ssl;
        
        return lnam;          
        
    }
    
     
    indentLevel = 1
    
     
    maxIndentLevel = 5
    
     



    contentsListedProp = &contentsListed
    
     



    listRecursively = ((libGlobal.curActor) == (libGlobal.playerChar))
    
    showListPrefix(lst, pl, paraCnt)  { message('list tall prefix', nil); }
    
    showListSuffix(lst, pl, paraCnt)  { }
    
    showListEmpty(paraCnt)  { message('list tall empty', nil); }
    
;





 



descContentsLister: ItemLister
     
    listed(obj) { return obj.examineListed && !obj.isHidden; }

    contentsListedProp = &contentsListedInExamine
;

 



openingContentsLister: ItemLister
     
    listed(obj) { return obj.examineListed && !obj.isHidden; }
    
     



    listRecursively = nil
;

 



lookInLister: ItemLister
     



    listed(obj) { return obj.searchListed && !obj.isHidden; }

    contentsListedProp = &contentsListedInSearch

;

 
simpleAttachmentLister: ItemLister
     
    listed(obj) { return obj.attachedTo != nil && !obj.isHidden; }
    
;

 
plugAttachableLister: simpleAttachmentLister
;

 



class CustomRoomLister: ItemLister
    
     
    listed(obj) { return obj.lookListed && !obj.isHidden; }
    
     






    construct(prefix, prefixMethod:?, suffix:?, suffixMethod:?)
    {
        prefix_ = prefix;
        
        if(prefixMethod != nil)
            setMethod(&showListPrefix, prefixMethod);
        
        if(suffix != nil)
            suffix_ = suffix;
        
        if(suffixMethod != nil)
            setMethod(&showListSuffix, suffixMethod);
    }
    
    prefix_ = nil
    suffix_ = '. '
    
    showListPrefix(lst, pl, irName)  
    { 
        "<.p><<prefix_>> ";
    }
    
    showListSuffix(lst, pl, irName)  
    { 
        "<<suffix_>>";
    }
    
    showSubListing = (gameMain.useParentheticalListing)
;


 









 



class ListGroup: object
    
     



    minGroupSize = 2    
    
    
     
    showList(lister, lst)
    {
        showSimpleList(lister, lst);
    }
    
     


    
    showSimpleList(lister, lst)   {}
    
     



    listOrder = 100
    
     






    priority = 100
;


 
class ListGroupSorted: ListGroup
    
     





    compareGroupItems (a, b) { return a.groupOrder - b.groupOrder; }    
    
     
    showList(lister, lst)
    {
         
        lst = sortList(lst);
        
         
        showSimpleList(lister, lst);
    }
    
     
    sortList(lst) { return lst.sort(nil, {a, b: compareGroupItems(a, b)});  }
;


 



class ListGroupSuffixPrefix: ListGroupSorted
    
     



    groupPrefix = nil
        
     



    groupSuffix = nil
    
     




    showGroupPrefix(pov, lst)         
    { 
         
        "<<spellNumber(lst.length)>> ";
        
         
        display(&groupPrefix); 
    }
    
     
    showGroupSuffix(pov, lst) { display(&groupSufffix); }
          
     
    showList(lister, lst)
    {
         
        showGroupPrefix((libGlobal.curActor), lst); 
        
         
        lst = sortList(lst);
        
         
        " ";
        
         
        showSimpleList(lister, lst);
        
         
        " ";
        
         
        showGroupSuffix((libGlobal.curActor), lst);
    }        
        
;


 




class ListGroupParen: ListGroupSorted
    
     
    showGroupCountName(lst)
    {
        "<<spellNumber(lst.length)>> <<pluralName>>";
    }     
    
     
    pluralName = ''
    
     
    showList(lister, lst)
    {
         
        showGroupCountName(lst);
        
         
        lst = sortList(lst);
        
         
        " (";
        
         
        showSimpleList(lister, lst);
        
         
        ")";
    }
;

 

class ListGroupCustom: ListGroup
    
     
    showGroupMsg(lst) { }
    
     
    showList(lister, lst)
    {
         
        showGroupMsg(lst);
    }
;