function matchingCountry(){
  for(let i = 0; i<this.drawCountry.length; i++){
    if(this.drawCountryChange==this.drawCountry[i].EnglishName){
      this.showCountry = this.drawCountry[i].ChinaName
    }
  }
}

export { matchingCountry }