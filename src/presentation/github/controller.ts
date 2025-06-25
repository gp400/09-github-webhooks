import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";

export class GithubController {

    constructor(
        private readonly gitHubService = new GitHubService()
    ){}

    webhookHandler = (req: Request, res: Response) => {

        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const payload = req.body;
        let message: string;

        switch( githubEvent ){
            case 'star':
                message = this.gitHubService.onStar( payload );
                break
            
            case 'issues':
                message = this.gitHubService.onIssue( payload )
                break;

            default:
                message = `Unkown event ${githubEvent}`
        }

        console.log({message});

        res.status(202).json("Accepted");
    }
}