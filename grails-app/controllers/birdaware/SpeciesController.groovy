package birdaware

import java.util.List
import grails.converters.JSON

class SpeciesController {
	def ebirdQuery
	List sightings
	
  def getSpp() {	
		sightings = ebirdQuery.getSpecies(params.name)
		render "${params.callback}(${sightings as JSON});"
  }
}
