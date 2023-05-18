package main.es.connect4.controllers;

public interface ControllersVisitor {

    void visit(InitController initController);
    void visit(StartController startController);
	void visit(PlayController playController);
	boolean visit(ResumeController resumeController);
    
}