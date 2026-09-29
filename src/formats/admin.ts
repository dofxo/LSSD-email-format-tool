// This file backs the /admin page. Formats added or edited at /admin are saved
// here so they live in the repo beside the built-in formats.
//
// Prefer editing through /admin: the JSON between the ADMIN_DATA markers below
// is regenerated on every save. Hand edits are fine too, as long as the block
// stays valid JSON.
import type { AdminFormatStore } from "./adminTypes";

export const adminFormatStore: AdminFormatStore = /* ADMIN_DATA */ {
	"overrides": {
		"General/1": {
			"title": "Personal Email",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence"
		},
		"SEB/30": {
			"title": "Probationary Operator Profile",
			"topicTitle": "[TRAINE OPERATOR] {Operator Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4086",
			"category": "Operator Training",
			"fields": [
				{
					"name": "traineeName"
				},
				{
					"name": "traineeRank"
				},
				{
					"name": "traineeJoinDate"
				},
				{
					"name": "traineeBadge"
				},
				{
					"name": "otp1Date"
				},
				{
					"name": "otp1Time"
				},
				{
					"name": "otp1Instructor"
				},
				{
					"name": "otp1Classroom"
				},
				{
					"name": "otp1Theory"
				},
				{
					"name": "otp2Date"
				},
				{
					"name": "otp2Time"
				},
				{
					"name": "otp2Instructor"
				},
				{
					"name": "otp2GroundTactics"
				},
				{
					"name": "otp3Date"
				},
				{
					"name": "otp3Time"
				},
				{
					"name": "otp3Instructor"
				},
				{
					"name": "otp3AirTactics"
				}
			]
		},
		"SEB/31": {
			"title": "OTP Session 1",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4086",
			"category": "Operator Training",
			"fields": [
				{
					"name": "otp1Date"
				},
				{
					"name": "otp1Time"
				},
				{
					"name": "otp1Instructor"
				},
				{
					"name": "otp1Classroom"
				},
				{
					"name": "otp1Theory"
				}
			]
		},
		"SEB/34": {
			"title": "Exam Sent to Trainee",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4086",
			"category": "Operator Training",
			"fields": []
		},
		"SEB/33": {
			"title": "OTP Session 3",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4086",
			"category": "Operator Training",
			"fields": [
				{
					"name": "otp3Date"
				},
				{
					"name": "otp3Time"
				},
				{
					"name": "otp3Instructor"
				},
				{
					"name": "otp3AirTactics"
				}
			]
		},
		"SEB/32": {
			"title": "OTP Session 2",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4086",
			"category": "Operator Training",
			"fields": [
				{
					"name": "otp2Date"
				},
				{
					"name": "otp2Time"
				},
				{
					"name": "otp2Instructor"
				},
				{
					"name": "otp2GroundTactics"
				}
			]
		},
		"TSD/1": {
			"title": "BRAVO Certification - Pending practical",
			"body": "[lssdfooter][/lssdfooter]\n[divbox=white]\n[tsdlogo][/tsdlogo][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=115]Traffic Services Detail[/size]\n[size=95]\"Certification Pending Practical\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none][right]{{date}}[/right]\n[b]Deputy {{deputyName}}[/b]\n\nTSD Command is reaching out to inform you that your BRAVO Certification application has been moved to [b][color=orange][b]Pending Practical[/b][/color][/b]. You should now reach to out to any Traffic Deputy II or above who is BRAVO certified to complete your practical.\n\n[/list]\n\n\n\n[hr][/hr][list=none]\n\n[img]{{signature}}[/img]\n{{dRank}} {{name}}\n, Traffic Services Detail\nLos Santos County Sheriff's Department\n\n[/list][/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "BRAVO Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/1": {
			"title": "Application Pending Review",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Applications",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/2": {
			"title": "Application Shortlisted",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Applications",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/3": {
			"title": "Application Denied - Criminal Record",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Applications",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/4": {
			"title": "Application Denied - Input Reason(s)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Applications",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"RED/5": {
			"title": "Application Denied - No Spots",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Applications",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/6": {
			"title": "Application Pending Edit(s)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Applications",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"RED/7": {
			"title": "Accepted for Interview",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Interviews",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/8": {
			"title": "Interview Scheduling Attempt",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Interviews",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/9": {
			"title": "Interview Scheduled",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Interviews",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				},
				{
					"name": "interviewDate"
				}
			]
		},
		"RED/10": {
			"title": "Accepted for Academy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Academy",
			"fields": [
				{
					"name": "applicantName"
				},
				{
					"name": "applicantGender"
				},
				{
					"name": "date"
				}
			]
		},
		"RED/11": {
			"title": "Passed Academy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=958",
			"category": "Academy",
			"fields": [
				{
					"name": "date"
				}
			]
		},
		"RED/14": {
			"title": "Personal Email",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence",
			"fields": []
		},
		"TSD/2": {
			"title": "BRAVO Certification - Application accepted",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "BRAVO Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/3": {
			"title": "BRAVO Certification - Application denied",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "BRAVO Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/4": {
			"title": "BRAVO Certification - Certificaion passed",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "BRAVO Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/5": {
			"title": "Interceptor Certification - Pending practical",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "Interceptor Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/6": {
			"title": "Interceptor Certification - Application accepted",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "Interceptor Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/7": {
			"title": "Interceptor Certification - Application denied",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "Interceptor Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/8": {
			"title": "Interceptor Certification - Certificaion passed",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "Interceptor Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/9": {
			"title": "D10 Certification - Pending practical",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "D10 Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/10": {
			"title": "D10 Certification - Application accepted",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "D10 Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/11": {
			"title": "D10 Certification - Application denied",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "D10 Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"TSD/12": {
			"title": "D10 Certification - Certification passed",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3917",
			"category": "D10 Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/1": {
			"title": "Spike Strip - Application Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Spike Strip Certification",
			"fields": []
		},
		"ATD/2": {
			"title": "Spike Strip - Application Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Spike Strip Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/3": {
			"title": "Spike Strip - Application Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Spike Strip Certification",
			"fields": []
		},
		"ATD/4": {
			"title": "Spike Strip - Application Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Spike Strip Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/5": {
			"title": "Spike Strip - Certification Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Spike Strip Certification",
			"fields": []
		},
		"ATD/6": {
			"title": "Spike Strip - Certification Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Spike Strip Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/7": {
			"title": "Spike Strip - Certification Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Spike Strip Certification",
			"fields": []
		},
		"ATD/8": {
			"title": "Spike Strip - Certification Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Spike Strip Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/9": {
			"title": "HIOU Certification - Application Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIOU Certification",
			"fields": []
		},
		"ATD/10": {
			"title": "HIOU Certification - Application Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIOU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/11": {
			"title": "HIOU Certification - Application Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIOU Certification",
			"fields": []
		},
		"ATD/12": {
			"title": "HIOU Certification - Application Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIOU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/13": {
			"title": "HIOU Certification - Certification Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIOU Certification",
			"fields": []
		},
		"ATD/14": {
			"title": "HIOU Certification - Certification Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIOU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/15": {
			"title": "HIOU Certification - Certification Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIOU Certification",
			"fields": []
		},
		"ATD/16": {
			"title": "HIOU Certification - Certification Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIOU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/17": {
			"title": "HSIU Certification - Application Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSIU Certification",
			"fields": []
		},
		"ATD/18": {
			"title": "HSIU Certification - Application Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/19": {
			"title": "HSIU Certification - Application Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSIU Certification",
			"fields": []
		},
		"ATD/20": {
			"title": "HSIU Certification - Application Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/21": {
			"title": "HSIU Certification - Certification Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSIU Certification",
			"fields": []
		},
		"ATD/22": {
			"title": "HSIU Certification - Certification Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/23": {
			"title": "HSIU Certification - Certification Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSIU Certification",
			"fields": []
		},
		"ATD/24": {
			"title": "HSIU Certification - Certification Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/25": {
			"title": "HIU Certification - Application Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIU Certification",
			"fields": []
		},
		"ATD/26": {
			"title": "HIU Certification - Application Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/27": {
			"title": "HIU Certification - Application Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIU Certification",
			"fields": []
		},
		"ATD/28": {
			"title": "HIU Certification - Application Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/29": {
			"title": "HIU Certification - Certification Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIU Certification",
			"fields": []
		},
		"ATD/30": {
			"title": "HIU Certification - Certification Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/31": {
			"title": "HIU Certification - Certification Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HIU Certification",
			"fields": []
		},
		"ATD/32": {
			"title": "HIU Certification - Certification Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HIU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/33": {
			"title": "HSMU Certification - Application Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSMU Certification",
			"fields": []
		},
		"ATD/34": {
			"title": "HSMU Certification - Application Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSMU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/35": {
			"title": "HSMU Certification - Application Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSMU Certification",
			"fields": []
		},
		"ATD/36": {
			"title": "HSMU Certification - Application Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSMU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/37": {
			"title": "HSMU Certification - Certification Accepted - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSMU Certification",
			"fields": []
		},
		"ATD/38": {
			"title": "HSMU Certification - Certification Accepted - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSMU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/39": {
			"title": "HSMU Certification - Certification Denied - Reply to application",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "HSMU Certification",
			"fields": []
		},
		"ATD/40": {
			"title": "HSMU Certification - Certification Denied - Email Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "HSMU Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/41": {
			"title": "Firearm Certification - Application Accepted - Reply to application and Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Firearm Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "certificationType"
				}
			]
		},
		"ATD/42": {
			"title": "Firearm Certification - Application Denied(score) - Reply to application and Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Firearm Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "certificationType"
				},
				{
					"name": "scoredPoint"
				},
				{
					"name": "leastPoint"
				}
			]
		},
		"ATD/43": {
			"title": "Firearm Certification - Application Denied(Other) - Reply to application and Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Firearm Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "certificationType"
				},
				{
					"name": "reasons"
				}
			]
		},
		"ATD/44": {
			"title": "Firearm Certification - Certificaion Passed - Reply to application and Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Firearm Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "certificationType"
				}
			]
		},
		"ATD/45": {
			"title": "Firearm Certification - Certificaion Denied - Reply to application and Deputy",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4227",
			"category": "Firearm Certification",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "deputyRank"
				},
				{
					"name": "reasons"
				}
			]
		},
		"ATD/46": {
			"title": "Personnel File - New certification - Reply to post",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3513",
			"category": "Personnel Files",
			"fields": [
				{
					"name": "deputyName"
				},
				{
					"name": "certificationType"
				},
				{
					"name": "date"
				}
			]
		},
		"ATD/47": {
			"title": "Personnel File - New certification - Edit main post",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=3513",
			"category": "Personnel Files",
			"fields": [
				{
					"name": "certificationType"
				},
				{
					"name": "date"
				},
				{
					"name": "issuedBy"
				},
				{
					"name": "certificationStatus"
				}
			]
		},
		"FTB/1": {
			"title": "Field Training Session I Report",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Training sessions",
			"fields": [
				{
					"name": "fts1Date"
				},
				{
					"name": "fts1PatrolStart"
				},
				{
					"name": "fts1PatrolEnd"
				},
				{
					"name": "fts1Checklist"
				},
				{
					"name": "fts1Handbook"
				},
				{
					"name": "fts1Behaviour"
				},
				{
					"name": "fts1Communications"
				},
				{
					"name": "fts1Roleplay"
				},
				{
					"name": "fts1SectionsToRepeat"
				},
				{
					"name": "fts1Mistakes"
				},
				{
					"name": "fts1ReadyProgress"
				},
				{
					"name": "fts1AdditionalNotes"
				}
			]
		},
		"FTB/2": {
			"title": "Field Training Session II Report",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Training sessions",
			"fields": [
				{
					"name": "fts2Date"
				},
				{
					"name": "fts2PatrolStart"
				},
				{
					"name": "fts2PatrolEnd"
				},
				{
					"name": "fts2Checklist"
				},
				{
					"name": "fts2Handbook"
				},
				{
					"name": "fts2VehicleOperation"
				},
				{
					"name": "fts2Impound"
				},
				{
					"name": "fts2Behaviour"
				},
				{
					"name": "fts2Communications"
				},
				{
					"name": "fts2Roleplay"
				},
				{
					"name": "fts2SectionsToRepeat"
				},
				{
					"name": "fts2Mistakes"
				},
				{
					"name": "fts2ReadyProgress"
				},
				{
					"name": "fts2AdditionalNotes"
				}
			]
		},
		"FTB/3": {
			"title": "Field Training Session III Report",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Training sessions",
			"fields": [
				{
					"name": "fts3Date"
				},
				{
					"name": "fts3PatrolStart"
				},
				{
					"name": "fts3PatrolEnd"
				},
				{
					"name": "fts3Checklist"
				},
				{
					"name": "fts3Handbook"
				},
				{
					"name": "fts3Behaviour"
				},
				{
					"name": "fts3Communications"
				},
				{
					"name": "fts3Pursuit"
				},
				{
					"name": "fts3Driving"
				},
				{
					"name": "fts3Roleplay"
				},
				{
					"name": "fts3SectionsToRepeat"
				},
				{
					"name": "fts3Mistakes"
				},
				{
					"name": "fts3ReadyProgress"
				},
				{
					"name": "fts3AdditionalNotes"
				}
			]
		},
		"FTB/4": {
			"title": "Field Training Evaluation Report",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Evaluations",
			"fields": [
				{
					"name": "fteDate"
				},
				{
					"name": "ftePatrolStart"
				},
				{
					"name": "ftePatrolEnd"
				},
				{
					"name": "fteTask0"
				},
				{
					"name": "fteTask1"
				},
				{
					"name": "fteTask2"
				},
				{
					"name": "fteTask3"
				},
				{
					"name": "fteTask4"
				},
				{
					"name": "fteTask5"
				},
				{
					"name": "fteTask6"
				},
				{
					"name": "fteTask7"
				},
				{
					"name": "fteTask8"
				},
				{
					"name": "fteTask9"
				},
				{
					"name": "fteTask10"
				},
				{
					"name": "fteTimeline"
				},
				{
					"name": "fteGrade0"
				},
				{
					"name": "fteNote0"
				},
				{
					"name": "fteGrade1"
				},
				{
					"name": "fteNote1"
				},
				{
					"name": "fteGrade2"
				},
				{
					"name": "fteNote2"
				},
				{
					"name": "fteGrade3"
				},
				{
					"name": "fteNote3"
				},
				{
					"name": "fteGrade4"
				},
				{
					"name": "fteNote4"
				},
				{
					"name": "fteGrade5"
				},
				{
					"name": "fteNote5"
				},
				{
					"name": "fteGrade6"
				},
				{
					"name": "fteNote6"
				},
				{
					"name": "fteGrade7"
				},
				{
					"name": "fteNote7"
				},
				{
					"name": "fteGrade8"
				},
				{
					"name": "fteNote8"
				},
				{
					"name": "fteMockWith"
				},
				{
					"name": "fteMockGradeKeepUp"
				},
				{
					"name": "fteMockNoteKeepUp"
				},
				{
					"name": "fteMockGradeCallouts"
				},
				{
					"name": "fteMockNoteCallouts"
				},
				{
					"name": "fteMockGradeDriving"
				},
				{
					"name": "fteMockNoteDriving"
				},
				{
					"name": "fteMockGradeBackups"
				},
				{
					"name": "fteMockNoteBackups"
				},
				{
					"name": "fteArrestReportLink"
				},
				{
					"name": "fteReadySolo"
				},
				{
					"name": "fteIssues"
				},
				{
					"name": "fteIntervention"
				},
				{
					"name": "fteConcerning"
				},
				{
					"name": "fteRpCommands"
				},
				{
					"name": "fteOocDemeanor"
				},
				{
					"name": "fteRulesUnderstanding"
				},
				{
					"name": "fteShouldPass"
				}
			]
		},
		"FTB/5": {
			"title": "Daily Observation Report",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Evaluations",
			"fields": [
				{
					"name": "dorTraineeResponse"
				},
				{
					"name": "dorPatrolSummary"
				},
				{
					"name": "dorWrong"
				},
				{
					"name": "dorAdditionalTraining"
				},
				{
					"name": "dorGrade0"
				},
				{
					"name": "dorResponse0"
				},
				{
					"name": "dorGrade1"
				},
				{
					"name": "dorResponse1"
				},
				{
					"name": "dorGrade2"
				},
				{
					"name": "dorResponse2"
				},
				{
					"name": "dorGrade3"
				},
				{
					"name": "dorResponse3"
				},
				{
					"name": "dorGrade4"
				},
				{
					"name": "dorResponse4"
				},
				{
					"name": "dorGrade5"
				},
				{
					"name": "dorResponse5"
				},
				{
					"name": "dorGrade6"
				},
				{
					"name": "dorResponse6"
				},
				{
					"name": "dorFeedback"
				}
			]
		},
		"FTB/6": {
			"title": "Mock Pursuit Report",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Pursuits",
			"fields": [
				{
					"name": "mprDate"
				},
				{
					"name": "mprTime"
				},
				{
					"name": "mprFtdRankName"
				},
				{
					"name": "mprTraineeName"
				},
				{
					"name": "mprGradeKeepUp"
				},
				{
					"name": "mprNoteKeepUp"
				},
				{
					"name": "mprGradeCallouts"
				},
				{
					"name": "mprNoteCallouts"
				},
				{
					"name": "mprGradeDriving"
				},
				{
					"name": "mprNoteDriving"
				},
				{
					"name": "mprGradeBackups"
				},
				{
					"name": "mprNoteBackups"
				},
				{
					"name": "mprAnythingElse"
				}
			]
		},
		"FTB/7": {
			"title": "Reinstatement Theory Session",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Reinstatement",
			"fields": [
				{
					"name": "rtsDate"
				},
				{
					"name": "rtsPatrolStart"
				},
				{
					"name": "rtsPatrolEnd"
				},
				{
					"name": "rtsChecklist"
				},
				{
					"name": "rtsHandbook"
				},
				{
					"name": "rtsBehaviour"
				},
				{
					"name": "rtsCommunications"
				},
				{
					"name": "rtsRoleplay"
				},
				{
					"name": "rtsArrestReportLink"
				},
				{
					"name": "rtsSectionsToRepeat"
				},
				{
					"name": "rtsMistakes"
				},
				{
					"name": "rtsReadyProgress"
				},
				{
					"name": "rtsAdditionalNotes"
				}
			]
		},
		"FTB/8": {
			"title": "Reinstatement Evaluation",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1037",
			"category": "Reinstatement",
			"fields": [
				{
					"name": "rteDate"
				},
				{
					"name": "rtePatrolStart"
				},
				{
					"name": "rtePatrolEnd"
				},
				{
					"name": "rteChecklist"
				},
				{
					"name": "rteTimeline"
				},
				{
					"name": "rteGradeAttitude"
				},
				{
					"name": "rteNoteAttitude"
				},
				{
					"name": "rteGradeFieldAwareness"
				},
				{
					"name": "rteNoteFieldAwareness"
				},
				{
					"name": "rteGradeHandbook"
				},
				{
					"name": "rteNoteHandbook"
				},
				{
					"name": "rteGradeCommunication"
				},
				{
					"name": "rteNoteCommunication"
				},
				{
					"name": "rteGradeDriving"
				},
				{
					"name": "rteNoteDriving"
				},
				{
					"name": "rteGradeStress"
				},
				{
					"name": "rteNoteStress"
				},
				{
					"name": "rteGradeRoleplay"
				},
				{
					"name": "rteNoteRoleplay"
				},
				{
					"name": "rteArrestReportLink"
				},
				{
					"name": "rteReadySolo"
				},
				{
					"name": "rteIssues"
				},
				{
					"name": "rteIntervention"
				},
				{
					"name": "rteConcerning"
				},
				{
					"name": "rteRpCommands"
				},
				{
					"name": "rteOocDemeanor"
				},
				{
					"name": "rteRulesUnderstanding"
				},
				{
					"name": "rteShouldPass"
				}
			]
		},
		"SEB/1": {
			"title": "Confidential Email",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "body"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				}
			]
		},
		"SEB/2": {
			"title": "Deployment Log",
			"topicTitle": "{Title} - {Date} - ACTIVE",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=3215",
			"category": "Logs",
			"fields": [
				{
					"name": "operators"
				},
				{
					"name": "logDate"
				},
				{
					"name": "deploymentStart"
				},
				{
					"name": "deploymentEnd"
				},
				{
					"name": "confiscatedItems"
				},
				{
					"name": "suspects"
				},
				{
					"name": "eventDescription"
				}
			]
		},
		"SEB/3": {
			"title": "Patrol Log",
			"topicTitle": " SEB Patrol - {DATE} - {Passive/Active}",
			"body": "[img]https://i.imgur.com/XKbhNaG.png[/img]\n[center][color=#BF0000][size=85]Sharing this information is strictly forbidden.[/size][/color][/center]\n[divbox=white][center][size=85][i]S.E.B. Callsign: {{callsign}}[/i][/size][/center]\n[b]Operators:[/b]\n[list=]\n{{operators}}\n[/list]\n[b]Date:[/b] {{logDate}}\n[b]Time:[/b] {{deploymentStart}} - {{deploymentEnd}}\n\n[b]DELTA Summary/Timeline:[/b]\n\n{{eventDescription}}\n\n\n[b]Signature:[/b] [i]{{signature}}[/i]\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=3216",
			"category": "Logs",
			"fields": [
				{
					"name": "callsign",
					"label": "S.E.B. Callsign (e.g. 242S)"
				},
				{
					"name": "operators"
				},
				{
					"name": "logDate"
				},
				{
					"name": "deploymentStart"
				},
				{
					"name": "deploymentEnd"
				},
				{
					"name": "eventDescription"
				}
			]
		},
		"SEB/4": {
			"title": "Dive Team Certification - Passed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				}
			]
		},
		"SEB/5": {
			"title": "Dive Team Certification - Failed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "senderPosition"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/6": {
			"title": "Advanced Aerial Unit Certification - Passed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				}
			]
		},
		"SEB/7": {
			"title": "Advanced Aerial Unit Certification - Failed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/8": {
			"title": "Long Range Rifle Certification - Passed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "date"
				}
			]
		},
		"SEB/9": {
			"title": "Long Range Rifle Certification - Failed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/10": {
			"title": "EOD Technician Certification - Passed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				}
			]
		},
		"SEB/11": {
			"title": "EOD Technician Certification - Failed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/12": {
			"title": "Crisis Negotiator Certification - Passed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				}
			]
		},
		"SEB/13": {
			"title": "Crisis Negotiator Certification - Failed (Written Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Written exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "applicationDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/14": {
			"title": "Dive Team Certification - Passed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				}
			]
		},
		"SEB/15": {
			"title": "Dive Team Certification - Failed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/16": {
			"title": "Advanced Aerial Unit Certification - Passed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				}
			]
		},
		"SEB/17": {
			"title": "Advanced Aerial Unit Certification - Failed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/18": {
			"title": "Long Range Rifle Certification - Passed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				}
			]
		},
		"SEB/19": {
			"title": "Long Range Rifle Certification - Failed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/20": {
			"title": "EOD Technician Certification - Passed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				}
			]
		},
		"SEB/21": {
			"title": "EOD Technician Certification - Failed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "practicalDate"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "date"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/22": {
			"title": "Crisis Negotiator Certification - Passed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "cnGrade0"
				},
				{
					"name": "cnReason0"
				},
				{
					"name": "cnGrade1"
				},
				{
					"name": "cnReason1"
				},
				{
					"name": "cnGrade2"
				},
				{
					"name": "cnReason2"
				},
				{
					"name": "cnGrade3"
				},
				{
					"name": "cnReason3"
				},
				{
					"name": "cnGrade4"
				},
				{
					"name": "cnReason4"
				},
				{
					"name": "cnGrade5"
				},
				{
					"name": "cnReason5"
				}
			]
		},
		"SEB/23": {
			"title": "Crisis Negotiator Certification - Failed (Practical Exam)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=4145",
			"category": "Practical exams",
			"fields": [
				{
					"name": "operatorLastName"
				},
				{
					"name": "senderPosition"
				},
				{
					"name": "cnGrade0"
				},
				{
					"name": "cnReason0"
				},
				{
					"name": "cnGrade1"
				},
				{
					"name": "cnReason1"
				},
				{
					"name": "cnGrade2"
				},
				{
					"name": "cnReason2"
				},
				{
					"name": "cnGrade3"
				},
				{
					"name": "cnReason3"
				},
				{
					"name": "cnGrade4"
				},
				{
					"name": "cnReason4"
				},
				{
					"name": "cnGrade5"
				},
				{
					"name": "cnReason5"
				}
			]
		},
		"SEB/24": {
			"title": "Operator Exam - Passed",
			"topicTitle": "Operator Exam Result",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Operator exams",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				}
			]
		},
		"SEB/25": {
			"title": "Operator Exam - Failed",
			"topicTitle": "Operator Exam Result",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Operator exams",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				},
				{
					"name": "reasons"
				}
			]
		},
		"SEB/26": {
			"title": "Promotion Email",
			"topicTitle": "SEB - Promotion Notice",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Personnel",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				}
			]
		},
		"SEB/27": {
			"title": "Training Session Scheduling",
			"topicTitle": "{Training Title } - { Date } - {Time}",
			"body": "[img]https://i.imgur.com/MWkrXmo.png[/img]\n[divbox=white]\n[center][size=150][b]{{trainingName}}[/b][/size][/center]\n[b]Date: [/b] [b]{{sessionDate}}, {{sessionTime}}[/b] \n[b]Operators Required:[/b] As many as possible\n[b]Location:[/b] {{location}}\n[b]Training Description/Guidelines:[/b] \n{{trainingDescription}}",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4069",
			"category": "Training",
			"fields": [
				{
					"name": "trainingName"
				},
				{
					"name": "sessionDate"
				},
				{
					"name": "sessionTime"
				},
				{
					"name": "location"
				},
				{
					"name": "instructor"
				},
				{
					"name": "trainingDescription"
				}
			]
		},
		"SEB/28": {
			"title": "Inactivity Notice",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Personnel",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "operatorLastName"
				}
			]
		},
		"SEB/29": {
			"title": "Email",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "body"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				}
			]
		},
		"SEB/35": {
			"title": "TD Instructor Acceptance",
			"topicTitle": "TD instructor Application Result",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "recipientName"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				}
			]
		},
		"SEB/36": {
			"title": "TD Instructor Denial",
			"topicTitle": "TD instructor Application Result",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Correspondence",
			"fields": [
				{
					"name": "date"
				},
				{
					"name": "recipientName"
				},
				{
					"name": "bureauPosition"
				},
				{
					"name": "certifications"
				},
				{
					"name": "reasons"
				}
			]
		},
		"Supervisory/1": {
			"title": "Promotion Notice",
			"topicTitle": " [Promotion] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "previousRank"
				},
				{
					"name": "newRank"
				},
				{
					"name": "date"
				}
			]
		},
		"Supervisory/3": {
			"title": "Demotion Notice",
			"topicTitle": " [Demotion] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "previousRank"
				},
				{
					"name": "newRank"
				},
				{
					"name": "date"
				}
			]
		},
		"Supervisory/2": {
			"title": "Academy Notice",
			"topicTitle": "[Academy Graduation] {Deputy Name}  ",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "date"
				}
			]
		},
		"Supervisory/4": {
			"title": "Discharge Notice",
			"topicTitle": "[Honorable/Dishonorable Discharge] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Discharges",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "date"
				},
				{
					"name": "authorizingDeputy"
				},
				{
					"name": "dischargeType"
				},
				{
					"name": "summary"
				}
			]
		},
		"Supervisory/5": {
			"title": "Suspension Notice (Form)",
			"topicTitle": "[Suspension] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Suspensions",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "date"
				},
				{
					"name": "authorizingDeputy"
				},
				{
					"name": "summary"
				},
				{
					"name": "suspensionStart"
				},
				{
					"name": "suspensionEnd"
				}
			]
		},
		"Supervisory/6": {
			"title": "Reinstatement Notice",
			"topicTitle": "[Reinstatement] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "previousRank"
				},
				{
					"name": "newRank"
				},
				{
					"name": "date"
				}
			]
		},
		"Supervisory/7": {
			"title": "Reassignment Notice",
			"topicTitle": "[Reassignment] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "previousRank"
				},
				{
					"name": "reassignmentAssignment"
				},
				{
					"name": "date"
				}
			]
		},
		"Supervisory/8": {
			"title": "Transfer Notice",
			"topicTitle": "[Transfer] {Deputy Name}",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=937",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "previousRank"
				},
				{
					"name": "newRank"
				},
				{
					"name": "date"
				}
			]
		},
		"Supervisory/9": {
			"title": "Master Deputy/Detective Information Email",
			"topicTitle": "Master Deputy/Detective Information",
			"body": "[LSSDfooter][/LSSDfooter][divbox=white]\n[img]https://i.ibb.co/PZWH0Rx9/FAyEyJd.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=115]Master Deputy Information.[/size]\n[size=95]\"A TRADITION OF SERVICE\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none]\n[b]Re:[/b] Master Deputy/Detective Information.\n\nMaster Deputy/Detective [b]undefined,[/b]\n\nFirst and foremost, I would like to congratulate you on your promotion to Master Deputy. You have worked hard to achieve the rank of Master Deputy (MFTD) and you should be nothing but proud of yourself. You should make yourself acquainted with your new rank authority by reading [url=https://gov.eclipse-rp.net/viewtopic.php?t=194190]2.2 - Rank Authority[/url] of the Los Santos County Sheriff's Department Employee Manual.\n\nBeing a Master Deputy means that you're at the last field staff position that the Los Santos County Sheriff's Department offers. We understand that some Master Deputies wish to further progress and become supervisors of the Los Santos County Sheriff's Department, and that is great. You can read about what it takes to become a Sergeant-in-Training in [url=https://gov.eclipse-rp.net/viewtopic.php?t=194196]2.5 Promotion Guidelines[/url] of the Los Santos County Sheriff's Department Employee Manual and about the Sergeant Training Program in the [url=https://gov.eclipse-rp.net/viewforum.php?f=998]Position Opportunities[/url] board.\n\nAs a Master Deputy, you will be expected to handle [b]Ride-Along requests[/b]. You can find all information (including response formats) in the Los Santos County Sheriff's Department Employee Manual, [url=https://gov.eclipse-rp.net/viewtopic.php?t=205777]3.14 - Ride Along Program[/url], it is recommended that you keep a copy with you [ooc]bookmark it[/ooc].\n\nIf you have any questions about being a Master Deputy or your responsibilities, then don't hesitate to reach out - we would love to assist you.\n\nBest of luck with your new position,\n[/list]\n\n[hr][/hr][list=none]\n\nFrom\n[img][/img]\n \nLos Santos County Sheriff's Department\n[/list][/divbox][LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Notices",
			"fields": [
				{
					"name": "recipientName"
				}
			]
		},
		"Supervisory/10": {
			"title": "Resignation Email",
			"topicTitle": "Resignation Notice",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Personnel changes",
			"fields": [
				{
					"name": "recipientName"
				}
			]
		},
		"Supervisory/11": {
			"title": "Dishonourable Discharge (AWOL)",
			"topicTitle": "Dishonourable Discharge (AWOL)",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Discharges",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "salutation"
				}
			]
		},
		"Supervisory/12": {
			"title": "Dishonourable Discharge ((OOC Reason))",
			"topicTitle": "Dishonourable Discharge ((OOC Reason))",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Discharges",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "reasons"
				}
			]
		},
		"Supervisory/13": {
			"title": "Dishonourable Discharge (Input Reason)",
			"topicTitle": "Dishonourable Discharge ",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Discharges",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "reasons"
				}
			]
		},
		"Supervisory/14": {
			"title": "Inactivity Notice",
			"topicTitle": "Inactivity Notice - {DD/MM} - Action Required",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Notices",
			"fields": [
				{
					"name": "recipientName"
				}
			]
		},
		"Supervisory/15": {
			"title": "((Ratio Notice))",
			"topicTitle": "((Ratio Notice))",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Notices",
			"fields": [
				{
					"name": "recipientName"
				}
			]
		},
		"Supervisory/16": {
			"title": "Disciplinary Driving Assessment Notice",
			"topicTitle": "Disciplinary Driving Assessment Notice",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Notices",
			"fields": [
				{
					"name": "recipientName"
				}
			]
		},
		"Supervisory/17": {
			"title": "Suspension Notice (Email)",
			"topicTitle": "Suspension Notice ",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/ucp.php?i=pm&mode=compose",
			"category": "Suspensions",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "summary"
				},
				{
					"name": "suspensionStart"
				},
				{
					"name": "suspensionEnd"
				},
				{
					"name": "suspensionDuration"
				}
			]
		},
		"Supervisory/18": {
			"title": "LOA/ROH Response",
			"body": "",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1000",
			"category": "Responses",
			"fields": [
				{
					"name": "recipientName"
				},
				{
					"name": "response"
				}
			]
		},
		"Supervisory/19": {
			"title": "Commendation Response",
			"body": "",
			"govLink": "",
			"category": "Responses",
			"fields": [
				{
					"name": "civilianName"
				}
			]
		}
	},
	"custom": [
		{
			"id": "37",
			"division": "SEB",
			"title": "Dive Team Certification",
			"topicTitle": "[DIVE TEAM Certification] Operator {Fname Lname}",
			"body": "[img]https://i.imgur.com/b2vqkjc.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]FULL NAME:[/b] {{name}}\n[b]RANK:[/b] {{dRank}}\n[b]BADGE NUMBER:[/b] {{badgeNumber}}\n[b]SEB SINCE:[/b] {{sebJoinDate}}\n[/divbox]\n\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b][i]Why are you applying for the Dive Team?[/i][/b] [i](Minimum 120 words)[/i]\n{{dgq1}}\n[b][i]What do you believe are the primary responsibilities of a Dive Team operator?[/i][/b]\n{{dgq2}}\n[b][i]What hazards may a diver encounter during underwater operations?[/i][/b]\n{{dgq3}}\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[b][size=150]Scenario 1[/size][/b]  \nA 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team.\n[b][i]What is your approach to resolving this situation?[/i][/b] [b](Minimum of 100 words)[/b]\n{{dts1}}\n\n[b][size=150]Scenario 2[/size][/b]  \nDuring a boat pursuit, suspects are observed throwing multiple bags and a firearm into the sea before escaping.\n[b][i]How would you handle the recovery operation?[/i][/b] [b](Minimum of 100 words)[/b]\n{{dts2}}\n\n[b][size=150]Scenario 3[/size][/b]  \nDuring a dive operation, your assigned partner signals low air and begins showing signs of panic.\n[b][i]What actions do you take?[/i][/b] [b](Minimum of 100 words)[/b]\n{{dts3}}\n\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebJoinDate",
					"label": "SEB Join date"
				},
				{
					"name": "dgq1"
				},
				{
					"name": "dgq2"
				},
				{
					"name": "dgq3"
				},
				{
					"name": "dts1"
				},
				{
					"name": "dts2"
				},
				{
					"name": "badgeNumber",
					"label": "Your badge number"
				}
			]
		},
		{
			"id": "38",
			"division": "SEB",
			"title": "Advanced Aerial Unit Certification",
			"topicTitle": "[AAU Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/NUbXkVL.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]Full Name:[/b] [i]{{name}}[/i]\n[b]Rank:[/b] [i]{{dRank}}[/i]\n[b]Badge Number:[/b] [i]{{badgeNumber}}[/i]\n[b]SEB Since:[/b] [i]{{sebSince}}[/i]\n[/divbox]\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b]Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?[/b]\n[i]{{agq1}}[/i]\n[b]What are the responsibilities of an Advanced Aerial Unit Pilot?[/b]\n[i]{{agq2}}[/i]\n[b]Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State a few examples or experiences you have faced. [/b]\n[i]{{agq3}}[/i]\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[center][size=200]Scenario 1[/size][/center]\n[b]SAAA comes in over the department radio, wherein they state that their towers see an aircraft that won't respond to them. How do you approach the aircraft and resolve the situation? [/b]\n[i]{{ats1}}[/i]\n[center][size=200]Scenario 2[/size][/center]\n[b]You are piloting the 2-D-8 Annihilator Gunship, and you are called to a large-scale gang situation in order to perform an aerial assault with a full team of operators on board, however, your aircraft comes under large-scale direct gunfire from the hostiles mentioned previous. What do you do?[/b]\n[i]{{ats2}}[/i]\n[center][size=200]Scenario 3[/size][/center]\n[b]During a bank robbery, the suspects take a hostage and in turn negotiate for a helicopter to escape with. Knowing that the individuals on board the helicopter are armed, prone to firing upon law enforcement, and volatile, how do you approach the situation?[/b]\n[i]{{ats3}}[/i]\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "agq1",
					"label": "Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?"
				},
				{
					"name": "agq2",
					"label": "What are the responsibilities of an Advanced Aerial Unit Pilot?"
				},
				{
					"name": "agq3",
					"label": "Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State a few examples or experiences you have faced."
				}
			]
		},
		{
			"id": "39",
			"division": "SEB",
			"title": "EOD Technician Certification",
			"topicTitle": "[EOD Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/1qJrDRr.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]Full Name:[/b] [i]{{name}}[/i]\n[b]Rank:[/b] [i]{{dRank}}[/i]\n[b]Badge Number:[/b] [i]{{badgeNumber}}[/i]\n[b]SEB Since:[/b] [i]{{sebSince}}[/i]\n[/divbox]\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b]Why are you applying for EOD, and how would you be an asset by getting the certification?[/b]\n[i]{{egq1}}[/i]\n[b]What are the responsibilities of an EOD operator?[/b]\n[i]{{egq2}}[/i]\n[b]Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State few examples or experiences you have faced. [/b]\n[i]{{egq3}}[/i]\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[center][size=200]Scenario 1[/size][/center]\n[b]You have been called to paleto station, where a deputy found on top of the front desk what looked to him as an explosive device of some sort. How would you go by to assess and identify the device? And how would you handle it? Give a detailed explanation, Image attached below of what the device looks like. [/b]\n[img]https://i.ibb.co/FbjTZ24J/rx-N9x5n.jpg[/img]\n[i]{{ets1}}[/i]\n[center][size=200]Scenario 2[/size][/center]\n[b]You arrive at a hostage situation, where the hostage taker is reported to have an explosive device in his possession, the negociator managed to have the hostage taker agree to give the bomb away. How would you use the equipment available to you to handle the retrieval of the explosive device. Give a detailed explanation of which equipment you use and why.[/b]\n[i]{{ets2}}[/i]\n[center][size=200]Scenario 3[/size][/center]\n[b]During a drug bust, your team stumbles upon a safe door, locked and they are unable to open it. How would you use the equipment available to you to get through the safe door safely.[/b]\n[i]{{ets3}}[/i]\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "egq1"
				},
				{
					"name": "egq2"
				},
				{
					"name": "egq3"
				},
				{
					"name": "ets1"
				},
				{
					"name": "ets2"
				},
				{
					"name": "ets3"
				}
			]
		},
		{
			"id": "40",
			"division": "SEB",
			"title": "Crisis Negotiator Certification",
			"topicTitle": "[CN Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/b2vqkjc.png[/img]\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]FULL NAME:[/b] {{name}}\n[b]RANK:[/b] {{dRank}}\n[b]BADGE NUMBER:[/b] {{badgeNumber}}\n[b]SEB SINCE:[/b] {{sebSince}}\n[/divbox]\n\n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n[divbox=white]\n[b][i]Why are you applying for the Crisis Negotiator Certification?[/i][/b] [i](Minimum 120 words)[/i]\n{{cgq1}}\n[b][i]Have you ever been in a situation where you had to negotiate a situation?[/i][/b]\n{{cgq2}}\n[b][i]How would you define negotiation?[/i][/b]\n{{cgq3}}\n[b][i]What negotiation skills do you believe are crucial for successful outcomes?[/i][/b]\n{{cgq4}}\n[/divbox]\n[lssdsubtitle]Section 3 - Theoretical Scenario Questions[/lssdsubtitle]\n[divbox=white]\n[b][size=150]Scenario 1[/size][/b]\n[b]Situation: A group of armed individuals has barricaded themselves in a residential building, holding multiple hostages. Describe the strategic considerations you would make as the assigned negotiator and how you would direct your team to approach this delicate and very dangerous situation.[/b]\n{{cts1}}\n[b][size=150]Scenario 2[/size][/b]\n[b]Situation: A hostage-taker exhibits signs of extreme agitation and is becoming increasingly unpredictable. Outline your communication strategy and how you would manage the evolving threat while ensuring the safety of both hostages and your team. Please be detailed in your response.[/b]\n{{cts2}}\n[b][size=150]Scenario 3[/size][/b]\n[b]Situation: You are negotiating a hostage situation and the hostage taker is becoming very agitated and is failing to adhere to the previously discussed demands. You have been very open to working with the Hostage Taker to the best of your ability but are beginning to believe that there will not be an easy way to get the hostage to safety. You have a Sniper Certified Operator Available, explain your next course of action and how you would handle the situation from there.[/b]\n{{cts3}}\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "cgq1"
				},
				{
					"name": "cgq2"
				},
				{
					"name": "cgq3"
				},
				{
					"name": "cgq4"
				},
				{
					"name": "cts1"
				},
				{
					"name": "cts2"
				},
				{
					"name": "cts3"
				}
			]
		},
		{
			"id": "41",
			"division": "SEB",
			"title": "Long Range Rifle Certification",
			"topicTitle": "[LRR Certification] Operator {FName LName}",
			"body": "[img]https://i.imgur.com/7SSPqSy.png[/img]\n\n[lssdsubtitle]Section 1 - Personal Information[/lssdsubtitle]\n[divbox=white]\n[b]Full Name:[/b] [i]{{name}}[/i]\n[b]Rank:[/b] [i]{{dRank}}[/i]\n[b]Badge Number:[/b] [i]{{badgeNumber}}[/i]\n[b]SEB Since:[/b] [i]{{sebSince}}[/i]\n[/divbox]\n \n[lssdsubtitle]Section 2 - General Questions[/lssdsubtitle]\n \n[divbox=white]\n[b]How would you be an asset to the Special Enforcement Bureau if you became Long Range Rifle Qualified[/b]\n[i]{{lgq1}}[/i]\n \n[b]Do you feel comfortable making split-second decisions? If so, provide us a detailed description of a scenario where you had to make a split-second decision previously.[/b]\n[i]{{lgq2}}[/i]\n \n[b]What motivates you to become certified to use Long Range Rifles? (in depth, at least 1 paragraph)[/b]\n[i]{{lgq3}}[/i]\n[/divbox]\n \n[lssdsubtitle] Section 3 - Theoretical Scenario Questions [/lssdsubtitle]\n \n[divbox=white]\n[hr][/hr]\n[size=125][b]SCENARIO 1[/b][/size]\n[b] In the following scenario you and your team arrive at the Paleto Bay gas station. When you arrive, you and your team spot a man wielding a pistol, holding a lady at gunpoint. ([color=#FF0000]see illustrative picture below[/color]). Behind the man, you see three injured people who have been shot and need immediate medical attention. To be able to tend to them, the man needs to be arrested or taken down. Your team can not get an angle at him from the ground without noticing. He's screaming he will shoot her if any of you comes closer. There are multiple buildings you can go onto. One of the north side, one on the south side, where the team is standing and one of the west side. How would you go about this scenario and how would you take the suspect out without injuring the already injured 10-16's and the hostage.[/b]\n\n[spoiler=Image][center][img]https://i.ibb.co/V0JPbw9L/Hly7k-NC.png[/img][/center][/spoiler]\n \n[i]{{lts1}}[/i]\n[hr][/hr]\n \n[size=125][b]SCENARIO 2[/b][/size]\n[b]On your way to an operation, you find a deputy along the road that just got shot at and you see a car leaving the area. You have two vehicles present. One vehicle will go after the suspect and the other one will treat the deputy. A long pursuit follows and when the suspect is finally brought to a stop, he gets out and aims his weapon and you and your team. However, you only have your service pistol and sniper rifle on you. Would you be allowed to use the sniper rifle? If so, how would you use it? If not, why wouldn't you be allowed to use it?[/b]\n \n[i]{{lts2}}[/i]\n[hr][/hr]\n \n[size=125][b]SCENARIO 3[/b][/size]\n[b] In the following scenario, you are responding to a large shoot-out with multiple injured 10-15's, 10-16's and PD officers. The location is the Legion Square parking lot. To respond quickly, you use the Blackstar to get there as quickly as possible. Shots are still being fired and heavy weapons are involved. Where and how would you deploy? Would you go street level, would you ask to be placed on a rooftop, how would you assess who is a threat and who is not?[/b]\n\n \n[i]{{lts3}}[/i]\n\n\n[/divbox]\n[img]https://i.imgur.com/q0fHG1F.png[/img]",
			"govLink": "https://gov.eclipse-rp.net/posting.php?mode=post&f=4145",
			"category": "Certification Application",
			"fields": [
				{
					"name": "sebSince"
				},
				{
					"name": "lgq1"
				},
				{
					"name": "lgq2"
				},
				{
					"name": "lgq3"
				},
				{
					"name": "lts1",
					"label": "In the following scenario you and your team arrive at the Paleto Bay gas station. When you arrive, you and your team spot a man wielding a pistol, holding a lady at gunpoint. (see illustrative picture below). Behind the man, you see three injured people who have been shot and need immediate medical attention. To be able to tend to them, the man needs to be arrested or taken down. Your team can not get an angle at him from the ground without noticing. He's screaming he will shoot her if any of you comes closer. There are multiple buildings you can go onto. One of the north side, one on the south side, where the team is standing and one of the west side. How would you go about this scenario and how would you take the suspect out without injuring the already injured 10-16's and the hostage.\n{img=https://i.ibb.co/V0JPbw9L/Hly7k-NC.png}"
				},
				{
					"name": "lts2"
				},
				{
					"name": "lts3"
				}
			]
		},
		{
			"id": "2",
			"division": "General",
			"title": "Accepted",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST ACCEPTED[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nWe are glad to inform you that your ride-along request for the Los Santos County Sheriff's Department has been [b][i]accepted[/i][/b]. We request that you print this ride-along request out and keep it with you at all times throughout any ride-along that you may take. We would also like to thank you for showing interest in our ride-along program, we hope that you'll meet your desires and that you'll receive first-hand experience on what it's like being a Deputy Sheriff for the Los Santos County Sheriff's Department. \n \nThis ride-along request is valid for [b]7 days[/b], if you are still interested in partaking in the program after 7 days, you must send in a new request. \n \n[b]What should you do now?[/b]\n[list][*]Make sure that you come properly dressed for a Ride-Along, and with respect for our deputies, your personal hygiene should be prioritized. Refrain from using too much or very strong perfume as it may disorientate not only deputies but any civilians that you may come across during the ride-along. \n \n[*]If you are a licensed firearm holder, make sure that your firearm is kept safe, and locked away, in either your vehicle or at home. You may not bring your firearm with you during the ride-along.\n \n[*]Make sure that you carry not only a printed copy of this response but also some form of identification card. \n \n[*]If you are ready for a ride-along, proceed to visit Paleto or Sandy Station, you can consult with the deputy at the front desk or deputies leaving the station on whether they're available to take you on a ride-along. [/list]\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": [
				{
					"name": "FnameLname"
				}
			]
		},
		{
			"id": "3",
			"division": "General",
			"title": "Denied",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST DENIED[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nYou are being contacted regarding your ride-along request that you sent to the Los Santos County Sheriff's Department. Your request has been [b][i]denied[/i][/b] due to the following reasons: \n[list]\n[*]\n[*]\n[*]\n[/list]\n \nYou are free to send in a new request if you are still interested in partaking in the program.\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": []
		},
		{
			"id": "4",
			"division": "General",
			"title": "Denied (Banned) -  Criminal Record",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST DENIED - BANNED[/lssdsubtitle] \n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nYou are being contacted regarding your ride-along request that you sent to the Los Santos County Sheriff's Department. Your request has been [b][i]denied[/i][/b] and you are [b][i]banned[/i][/b] from re-applying to the program. The reason for this status is either due to your criminal record and/or for the reason(s) mentioned below. \n \n(( This ban is In Character only unless otherwise specified. You are free to reapply under a different character. ))\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": []
		},
		{
			"id": "5",
			"division": "General",
			"title": "Request Expired",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]REQUEST EXPIRED[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Dear {{FnameLname}},[/b]\n \nWe're sending you this notice to inform you that your ride-along request with the Los Santos County Sheriff's Department has expired and is no longer valid. If you wish to resume taking ride-alongs with deputies of the Sheriff's Department, you must resubmit another ride-along request on our website. \n\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n \n[img]https://i.gyazo.com/72b2c28eca45c9928b9a7e1d289e3017.png[/img]\nSheriff Ian Walter\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": []
		},
		{
			"id": "6",
			"division": "General",
			"title": "Ride-Along Session Report",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/35Dhzd5Z/s5FUN5w.png[/img]\n\n[lssdsubtitle]RIDE-ALONG SESSION REPORT[/lssdsubtitle]\n[divbox=white]\n[list=none]\n[b]Deputy Name:[/b] {{name}}\n[b]Deputy Rank[/b] {{dRank}}\n[b]Date and Time (( (Please use UTC: https://time.is/UTC )):[/b] {{rideAlongDate}} {{startTime}} > {{EndTime}}\n\n[b]Brief Summary of Session:[/b]\n[list]\n{{sessionSummary}}\n[/list]\n\n[b]Did any problems or issues occur?:[/b]\n[list]\n{{anyProblem}}\n[/list]\n\n[b]Notes for further ride-along sessions:[/b]\n[list]\n{{notesForFurther}}\n[/list]\n\n[hr][/hr]\n\nSincerely,\n\n[img]{{signature}}[/img]\n{{rankName}}\nLos Santos County Sheriff's Department\n[/list]\n[/divbox]\n[LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=995",
			"category": "Ride-Along Program",
			"fields": [
				{
					"name": "rideAlongDate"
				},
				{
					"name": "startTime",
					"label": "Start Time "
				},
				{
					"name": "EndTime",
					"label": "End Time"
				},
				{
					"name": "sessionSummary"
				},
				{
					"name": "anyProblem"
				},
				{
					"name": "notesForFurther"
				}
			]
		},
		{
			"id": "7",
			"division": "General",
			"title": "Impound Report",
			"topicTitle": "",
			"body": "[img]https://i.ibb.co/Vc5jwQNN/MOJn-M5B.png[/img]\n[divbox=white]\n[list=none][b][size=115]DEPUTY DETAILS[/size][/b]\n[list=none]\n[b]Full Name:[/b] {{name}}\n[b]Badge Number:[/b] {{badgeNumber}}\n[b]Callsign:[/b] {{callSign}}\n[/list]\n\n[b][size=115]VEHICLE DETAILS[/size][/b]\n[list=none]\n[b]Vehicle Model:[/b] {{vehicleModel}}\n[b]Vehicle Color:[/b] {{vehicleColor}}\n[b]License Plate:[/b] {{licensePlate}}\n[b]Vehicle Owner:[/b] {{vehicleOwner}}\n[b]Miscelleanous Details:[/b] {{miscelleanousDetails}}\n[/list]\n\n[b][size=115]IMPOUND DETAILS[/size][/b]\n[list=none]\n[b]Date and Time:[/b] {{impoundDate}}, {{impoundTime}} ((/time)).\n[b]Location:[/b] {{location}}\n[b]Brief Statement of Impounding Reason:[/b] {{briefStatementOfImpoundingReason}}\n[b]Deputies Involved:[/b] {{deputiesInvolved}}\n[b]Documented Evidence:[/b]\n[img]{{documentedEvidence}}[/img]\n[/list][/list]\n\n[hr][/hr][/divbox][LSSDfooter][/LSSDfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=70282",
			"category": "Vehicle Related Reports",
			"fields": [
				{
					"name": "callSign"
				},
				{
					"name": "vehicleModel"
				},
				{
					"name": "vehicleColor"
				},
				{
					"name": "licensePlate"
				},
				{
					"name": "vehicleOwner"
				},
				{
					"name": "miscelleanousDetails"
				},
				{
					"name": "impoundDate"
				},
				{
					"name": "impoundTime"
				},
				{
					"name": "location"
				},
				{
					"name": "briefStatementOfImpoundingReason"
				},
				{
					"name": "deputiesInvolved"
				},
				{
					"name": "documentedEvidence"
				}
			]
		},
		{
			"id": "8",
			"division": "General",
			"title": "Impound Release Report",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/b2urDtz.png[/img] \n[divbox=white] [size=115]IMPOUND RELEASE REPORT[/size] \n[list=none][b][size=115]DEPUTY DETAILS[/size][/b] \n[list=none] \n[b]Full Name:[/b] {{name}}\n[b]Badge Number:[/b] {{badgeNumber}}\n[b]Callsign:[/b] {{callSign}}\n[/list]  \n[b][size=115]VEHICLE DETAILS[/size][/b] \n[list=none] \n[b]Vehicle Model:[/b] {{vehicleModel}}\n[b]Vehicle Color:[/b] {{vehicleColor}}\n[b]License Plate:[/b] {{licensePlate}}\n[b]Vehicle Owner:[/b] {{vehicleOwner}}\n[/list]  \n[b][size=115]IMPOUND & PAYMENT DETAILS[/size][/b] \n[list=none] [b]Date of Impound:[/b] {{impounddate}}\n[b]Person Responsible of Impound:[/b] {{personResponsibleOfImpound}} \n[b]Fees Paid by Vehicle Owner:[/b] [color=#008000]${{feesPaidByVehicleOwner}}[/color] \n[/list][/list]  \n[hr][/hr] \n[/divbox]\n[img]https://i.imgur.com/PTqp5LP.png[/img]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=22348",
			"category": "Vehicle Related Reports",
			"fields": [
				{
					"name": "callSign"
				},
				{
					"name": "vehicleModel"
				},
				{
					"name": "vehicleColor"
				},
				{
					"name": "licensePlate"
				},
				{
					"name": "vehicleOwner"
				},
				{
					"name": "impounddate"
				},
				{
					"name": "personResponsibleOfImpound"
				},
				{
					"name": "feesPaidByVehicleOwner"
				}
			]
		},
		{
			"id": "9",
			"division": "General",
			"title": "Traffic Stop Report",
			"topicTitle": "",
			"body": "[LSSDfooter][/LSSDfooter][divbox=white]\n[img]https://i.imgur.com/nbsW4gJ.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=140]\"[i]A TRADITION OF SERVICE[/i]\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none][b][size=115]TRAFFIC STOP DETAILS[/size][/b]\n[list=none]\n[b]Location[/b]: {{location}}\n[b]Reason for Stop[/b]: {{reasonForStop}}\n[b]Approx. Time and Date[/b]: {{trafficStopDate}} {{trafficStopTime}}\n[b]Traffic Stop Outcome:[/b] {{trafficStopOutcome}}\n[/list]\n\n[hr]\n\n[b][size=115]VEHICLE DETAILS[/size][/b]\n[list=none]\n[b]Vehicle Driver:[/b] {{vehicleDriver}}\n[b]Vehicle Owner[/b]: {{vehicleOwner}}\n[b]License Plate[/b]: {{licensePlate}}\n[b]Vehicle VIN[/b]: {{vehicelVin}}\n[b]Vehicle Model[/b]: {{vehicleModel}}\n[b]Vehicle Color[/b]: {{vehicleColor}}\n[b]Occupants (If Applicable)[/b]: {{occupants}}\n[/list]\n\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=70409",
			"category": "Vehicle Related Reports",
			"fields": [
				{
					"name": "location"
				},
				{
					"name": "reasonForStop"
				},
				{
					"name": "trafficStopDate"
				},
				{
					"name": "trafficStopTime"
				},
				{
					"name": "trafficStopOutcome"
				},
				{
					"name": "vehicleDriver"
				},
				{
					"name": "vehicleOwner"
				},
				{
					"name": "licensePlate"
				},
				{
					"name": "vehicleModel"
				},
				{
					"name": "vehicelVin"
				},
				{
					"name": "vehicleColor"
				},
				{
					"name": "occupants"
				}
			]
		},
		{
			"id": "10",
			"division": "General",
			"title": "Department Traffic Collison Reports (DTC-R)",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/UkZivDh.png[/img]\n[divbox=white]\n[size=115]DEPARTMENT TRAFFIC COLLISION REPORT (DTC-R)[/size]\n\n[b][size=115]INCIDENT DETAILS[/size][/b]\n[list=none]\n[b]Deputy Name[/b]: {{name}}\n[b]Location of Incident[/b]: {{locationofincident}}\n[b]Date and Time[/b]: {{incidentTime}} | {{incidentdate}}\n[/list]\n\n[b][size=115]COLLISION DETAILS[/size][/b]\n[size=85][i]Please add a \"X\" all relevant areas[/i]. [/size]\n[list=none]\n[aligntable=left,0,0,0,0,0,0]\n[b]Driving Code[/b]:[color=white]-------------------------------------------[/color]\n{{drivingCode}}\n[/aligntable]\n\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Injuries sustained[/b]:[color=white]------------[/color] \n{{injuries}}\n[color=white]-[/color] \n[/aligntable]\n[hr]\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Damage to Department Vehicle[/b]:[color=white]-----------[/color] \n{{vehicleDamage}}\n[/aligntable]\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Damage to Secondary Vehicle[/b]:[color=white]------------[/color] \n{{secondaryDamage}}\n[color=white]-[/color]\n[/aligntable]\n[color=white]-[/color][hr]\n[/list]\n\n[b][size=115]STATEMENTS[/size][/b]\n[list=none]\n[b]Deputies Statment[/b]: \n[divbox=white]\n[i] {{deputiesStatment}}[/i]\n[/divbox]\n\n[color=white]-[/color][hr]\n[b]Secondary Vehicles Statement[/b]:\n[divbox=white]\n[i] {{secondaryVehiclesStatement}} [/i]\n[/divbox]\n[/list]\n\n[b][size=115]PHOTOGRAPHS OF THE INCIDENT[/size][/b]\n[list=none]\n[spoil]\n[img]{{photoOfIncident}}[/img]\n[/spoil]\n[/list]\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=189535",
			"category": "Vehicle Related Reports",
			"fields": [
				{
					"name": "locationofincident",
					"label": "Location Of Incident"
				},
				{
					"name": "incidentdate",
					"label": "Incident Date"
				},
				{
					"name": "incidentTime"
				},
				{
					"name": "drivingCode",
					"label": "Driving Code"
				},
				{
					"name": "injuries",
					"label": "Injuries Sustained"
				},
				{
					"name": "vehicleDamage",
					"label": "Damage to Department Vehicle"
				},
				{
					"name": "secondaryDamage",
					"label": "Damage to Secondary Vehicle"
				},
				{
					"name": "deputiesStatment"
				},
				{
					"name": "secondaryVehiclesStatement"
				},
				{
					"name": "photoOfIncident"
				}
			]
		},
		{
			"id": "11",
			"division": "General",
			"title": "Arrest Report",
			"topicTitle": "",
			"body": "[img]LINK_HERE[/img]\n[divbox=white]\n[size=115]ARREST REPORT[/size]\n\n{{suspectDetails}}\n\n[b][size=115]VEHICLES INVOLVED[/size][/b]\nPlease follow the format: Color, Model, LP XXXXXX, VIN, RO First Last\n[list=none]\n{{arrestVehicles}}\n\n[/list]\n\n[b][size=115]DEPUTY DETAILS[/size][/b]\n[list=none]\n[b]Full Name:[/b] {{name}}\n[b]Badge Number:[/b] {{badgeNumber}}\n[b]Callsign:[/b] {{callSign}}\n\n[/list]\n\n[b][size=115]INCIDENT DETAILS[/size][/b]\n[list=none]\n\n[b]Date of Incident:[/b] {{incidentdate}}\n[b]Deputies/Officers Involved:[/b] {{deputiesInvolved}}\n\n[b]Provide details of the incident leading up to the arrest.[/b]\n[list=none]{{arrestNarrative}}\n\n[/list]\n\n[/list][b][size=115]EVIDENCE DETAILS[/size][/b]\n[list=none]\n[b]Location of Evidence Locker:[/b] {{evidenceLocker}}\n{{evidenceItems}}\n\n[spoiler=Photo of the evidence in the locker (if applicable)][img]{{evidencePhoto}}[/img][/spoiler]\n\n[/list]\n\n[b][size=115]ARRESTING DEPUTY SIGNATURE[/size][/b]\n{{signature}}\n\n[/list]\n\n[hr][/hr]\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "",
			"category": "Arrest Related Reports",
			"fields": [
				{
					"name": "suspectDetails",
					"label": "Suspects"
				},
				{
					"name": "arrestVehicles",
					"label": "Vehicles Involved"
				},
				{
					"name": "incidentdate",
					"label": "Date of Incident"
				},
				{
					"name": "deputiesInvolved",
					"label": "Deputies/Officers Involved"
				},
				{
					"name": "arrestNarrative"
				},
				{
					"name": "evidenceLocker"
				},
				{
					"name": "evidenceItems",
					"label": "Evidence Exhibits"
				},
				{
					"name": "evidencePhoto"
				},
				{
					"name": "callSign",
					"label": "Callsign"
				}
			]
		},
		{
			"id": "12",
			"division": "General",
			"title": "Warrant Report",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/H2xvNl3.png[/img]\n[divbox=white]\n[size=115]WARRANT REPORT[/size]\n\n{{warrantSuspects}}\n\n[b][size=115]VEHICLES INVOLVED[/size][/b]\n[list=none]\n{{warrantVehicles}}\n\n[/list]\n\n[b][size=115]DEPUTY DETAILS[/size][/b]\n[list=none]\n[b]Full Name:[/b] {{name}}\n[b]Badge Number:[/b] {{badgeNumber}}\n[b]Callsign:[/b] {{callSign}}\n\n[/list]\n\n[b][size=115]INCIDENT NARRATIVE[/size][/b]\n[list=none]\n[b]Date of Incident:[/b] {{incidentdate}}\n[b]Deputies Involved:[/b] {{deputiesInvolved}}\n\n[b]Explain what happened, sufficient detail must be given to validate the justify the placed charges, videos could be provided.[/b]\n[list=none]{{warrantNarrative}}\n\n[/list]\n\n[b]Method of Identification[/b]\n[list=none]{{methodOfIdentification}}\n\n[/list][/list]\n[b][size=115]CONFISCATED EVIDENCE DETAILS[/size][/b]\n[list=none]\n[b]Document the possessions confiscated from the charged suspect.[/b]\n[i]Illegal evidence must be documented individually, examples of documented illegal evidence are \"Pistol .50\" or \"12 grams of Cocaine\". Body camera footage/pictures may be attached as an evidence exhibit.\n\nWhere possible the serial number of each firearm seized as evidence should be noted.[/i]\n\n{{confiscatedEvidence}}\n\n[spoiler=Photo of the evidence in the locker (if applicable)][img]{{evidencePhoto}}[/img][/spoiler]\n\n[/list]\n\n[b][size=115]ARRESTING DEPUTY SIGNATURE[/size][/b]\n{{signature}}\n\n[hr][/hr]\n[/divbox]\n[img]https://i.imgur.com/PTqp5LP.png[/img]",
			"govLink": "",
			"category": "Arrest Related Reports",
			"fields": [
				{
					"name": "warrantSuspects",
					"label": "Suspects"
				},
				{
					"name": "warrantVehicles",
					"label": "Vehicles Involved"
				},
				{
					"name": "incidentdate",
					"label": "Date of Incident"
				},
				{
					"name": "deputiesInvolved",
					"label": "Deputies Involved"
				},
				{
					"name": "warrantNarrative"
				},
				{
					"name": "methodOfIdentification"
				},
				{
					"name": "confiscatedEvidence"
				},
				{
					"name": "evidencePhoto"
				},
				{
					"name": "callSign",
					"label": "Callsign"
				}
			]
		},
		{
			"id": "13",
			"division": "General",
			"title": "Gang Incident Report",
			"topicTitle": "",
			"body": "[lssdfooter][/lssdfooter][divbox=white]\n[img]https://i.imgur.com/nbsW4gJ.png[/img][aligntable=right,350,0,0,0,0,#FFFFFF][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=115]Gang-Related Incident Report[/size]\n[size=95]\"A TRADITION OF SERVICE\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none]\n[b][size=115]INDIVIDUALS INVOLVED[/size][/b]\n[size=85][i]Please fill in the names of the individuals present and link arrest reports if applicable, split in groups based on clothing. Feel free to replace with organization name if known[/i]. [/size]\n[list=none]\n[aligntable=left,0,0,0,0,0,0]\n[b]Group One[/b][color=white]--------------------------------[/color] \n[list]{{groupOne}}[/list][/aligntable]\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Group Two[/b]\n[list]{{groupTwo}}[/list][/aligntable]\n[/list]\n[/list]\n[hr]-----ADD MORE NAMES ABOVE AS NEEDED-----[/hr]\n[list=none]\n[b][size=115]INCIDENT DETAILS[/size][/b]\n[size=85][i]Please fill in the details of the incident with as much detail as willing[/i]. [/size]\n[list=none]\n\n[b]Date of Incident:[/b] {{incidentdate}}\n[b]Location of Incident:[/b] {{location}}\n[b]Summary of the Incident:[/b] {{incidentSummary}}\n\n[/list][/list]\n[hr][/hr]\n[list=none]\n[b][size=115]WITNESSES AND OTHER OPTIONAL INFORMATION[/size][/b]\n[size=85][i]Please fill in who witnessed the incident and any other evidence you might have[/i]. [/size]\n[list=none]\n\n[b]Incident Witnesses[/b]: {{incidentWitnesses}}\n[b]Photos Taken[/b]: {{photosTaken}}\n[b]Bodycamera Evidence[/b]: {{bodycameraEvidence}}\n\n\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=121638",
			"category": "Gang related reports",
			"fields": []
		},
		{
			"id": "14",
			"division": "General",
			"title": "Gang Related Graffiti Report",
			"topicTitle": "",
			"body": "[LSSDfooter][/LSSDfooter][divbox=white]\n[img]https://i.imgur.com/nbsW4gJ.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=100]GANG-RELATED GRAFFITI REPORT[/size]\n[size=100]\"[i]A TRADITION OF SERVICE[/i]\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none][b][size=115]GANG-RELATED GRAFFITI DETAILS[/size][/b]\n[list=none]\n[b]Location:[/b] {{location}}\n[b]Date & Time:[/b] {{incidentDate}} | {{incidentTime}}\n[/list]\n\n[hr]\n\n[b][size=115]ADDITIONAL DETAILS[/size][/b]\n[list=none]\n[b]Photo(s):[/b] [i]Mandatory[/i]\n[spoiler=PHOTOS]\n{{incidentImages}}\n[/spoiler]\n\n[b]Potentially Linked Organizations to Graffiti:[/b] {{potentiallyLinkedOrganizationsToGraffiti}}\n\n[b]Additional Notes;[/b]\n[list]\n[*]{{AdditionalNotes}}\n[/list]\n\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=175478",
			"category": "Gang related reports",
			"fields": [
				{
					"name": "location"
				},
				{
					"name": "incidentDate"
				},
				{
					"name": "incidentTime"
				},
				{
					"name": "potentiallyLinkedOrganizationsToGraffiti"
				},
				{
					"name": "incidentImages"
				}
			]
		},
		{
			"id": "15",
			"division": "General",
			"title": "Use of Force Report",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/a3aDjGi.png[/img][divbox=white]\n[img]https://i.imgur.com/nbsW4gJ.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=140]\"[i]A TRADITION OF SERVICE[/i]\"[/size][/font][/right][/aligntable]\n[hr]\n\n[list=none][b][size=115]INCIDENT DETAILS[/size][/b]\n[list=none]\n[b]Suspect Name[/b]: {{suspectName}}\n[b]Location[/b]: {{location}}\n[b]Approx. Time and Date[/b]: {{incidentdate}} {{incidentTime}}\n[/list]\n\n[hr]\n\n[b][size=115]FORCE DETAILS[/size][/b]\n[size=85][i]Please add a \"X\" all relevant areas[/i]. [/size]\n\n\n[list=none]\n[aligntable=left,0,0,0,0,0,0]\n[b]Force Type[/b]:[color=white]-------------------------------------------[/color]\n{{forceType}}\n[/aligntable]\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Perception of Suspects Actions[/b]:[color=white]------------[/color] \n{{perceptionOfSuspectsActions}}\n[color=white]-[/color] \n[/aligntable]\n[hr]\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Police Equipment Used on Suspect[/b]:[color=white]-----------[/color] \n{{policeEquipmentUsedOnSuspect}}\n[/aligntable]\n\n[aligntable=left,0,0,0,0,0,0]\n[b]Outcome of Force[/b]:[color=white]------------[/color] \n{{outcomeOfForce}}\n[color=white]-[/color]\n[/aligntable]\n\n[color=white]-[/color][hr]\n[b]Summary of the Incident[/b]:\n[divbox=white]\n{{incidentSummary}}\n\n\n[/divbox]\n\n[/list]\n[hr]\n\n[b][size=115]WITNESSES AND SUPERVISOR[/size][/b]\n[size=85][i]Please fill in who witnessed the incident and who was in charge at the time[/i]. [/size]\n\n[b]Incident Witnesses[/b] [i](Optional)[/i]: {{incidentWitnesses}}\n[b]Shift/Scene Supervisor[/b] [i](Optional)[/i]: {{shiftSupervisor}}\n\n[/list]\n\n[hr][/hr]\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=70398",
			"category": "Other reports",
			"fields": [
				{
					"name": "suspectName"
				},
				{
					"name": "location"
				},
				{
					"name": "incidentdate"
				},
				{
					"name": "incidentTime"
				},
				{
					"name": "forceType",
					"label": "Force Type"
				},
				{
					"name": "perceptionOfSuspectsActions",
					"hint": "Passive"
				},
				{
					"name": "policeEquipmentUsedOnSuspect"
				},
				{
					"name": "outcomeOfForce"
				},
				{
					"name": "incidentSummary"
				},
				{
					"name": "incidentWitnesses"
				},
				{
					"name": "shiftSupervisor"
				}
			]
		},
		{
			"id": "16",
			"division": "General",
			"title": "License Unsuspension Report",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/rcdh3QT.png[/img]\n[divbox=white]\n[size=115]LICENSE UNSUSPENSION REPORT[/size]\n\n[b][size=115]REPORT DETAILS[/size][/b]\n[list=none]\n\n[b]Deputy's Full Name and Rank:[/b] {{rankName}}\n[b]Full Name of the Individual Whose License Was Unsuspended:[/b] {{licenseHolder}}\n[b]Date and Time of the Unsuspension (( UTC, /time )):[/b] {{incidentdate}} {{incidentTime}}\n\n[b]Total Demerits Applied Before Unsuspension:[/b] {{demeritsBefore}}\n\n[b]Total Demerits Re-Applied After Unsuspension:[/b] {{demeritsAfter}}\n[b]Reason for Unsuspending the License:[/b] \n{{unsuspensionReason}}\n\n[/list]\n[hr][/hr]\n[/divbox]\n[img]https://i.imgur.com/PTqp5LP.png[/img]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=175783",
			"category": "Other reports",
			"fields": []
		},
		{
			"id": "17",
			"division": "General",
			"title": "Evidence Release Report",
			"topicTitle": "",
			"body": "[LSSDfooter][/LSSDfooter][divbox=white]\n[img]https://i.imgur.com/nbsW4gJ.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=100]EVIDENCE RELEASE REPORT[/size]\n[size=100]\"[i]A TRADITION OF SERVICE[/i]\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none][b][size=115]RECIPIENT DETAILS[/size][/b]\n[list=none]\n[b]Full Name:[/b] {{evidenceRecipient}}\n[/list]\n\n[hr]\n\n[b][size=115]EVIDENCE RELEASE DETAILS[/size][/b]\n[list=none]\n[b]Date and Time:[/b] {{incidentdate}} {{incidentTime}}\n[b]Released Items:[/b]\n[list]{{releasedItems}}[/list]\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "",
			"category": "Other reports",
			"fields": []
		},
		{
			"id": "18",
			"division": "General",
			"title": "Citation Report",
			"topicTitle": "",
			"body": "[LSSDfooter][/LSSDfooter][divbox=white]\n[img]https://i.imgur.com/nbsW4gJ.png[/img][aligntable=right,0,0,0,0,0,0][right][font=Arial][b]\n[size=150]Los Santos County Sheriff's Department[/size][/b]\n[size=100]CITATION REPORT[/size]\n[size=100]\"[i]A TRADITION OF SERVICE[/i]\"[/size][/font][/right][/aligntable]\n[hr]\n[list=none][b][size=115]RECIPIENT DETAILS[/size][/b]\n[list=none]\n[b]Full Name:[/b] {{citationRecipient}}\n[b]Phone Number:[/b] {{citationPhone}}\n[b]Deputies Involved:[/b] {{deputiesInvolved}}\n[/list]\n\n[hr]\n\n[b][size=115]CITATION DETAILS[/size][/b]\n[list=none]\n[b]Location:[/b] {{location}}\n[b]Vehicle Owner:[/b] {{vehicleOwner}} \n[b]Date & Time:[/b] {{incidentdate}} {{incidentTime}}\n[b]Citation(s) Issued:[/b]\n[list]{{citationsIssued}}[/list]\n[b]Reason[/b]: {{citationReason}}\n[b]Additional Information;[/b]\n[list]{{additionalInformation}}[/list]\n[/list]\n\n[/divbox]\n[lssdfooter][/lssdfooter]",
			"govLink": "https://gov.eclipse-rp.net/viewtopic.php?t=175477",
			"category": "Other reports",
			"fields": []
		},
		{
			"id": "19",
			"division": "General",
			"title": "Patrol Report",
			"topicTitle": "",
			"body": "[img]https://i.imgur.com/jIbGT3G.png[/img]\n\n[divbox=white]\n[b]Date:[/b] {{patrolDate}}\n[b]Hours on Duty: [/b] {{patrolHours}}\n[b]Start of watch: [/b] {{startOfWatch}}\n\n[b]Arrests:[/b] {{patrolArrests}}\n[b]Citations:[/b] {{patrolCitations}}\n\n[b]Notes(Optional):[/b]\n{{patrolNotes}}\n\n[/divbox]",
			"govLink": "https://gov.eclipse-rp.net/viewforum.php?f=1621",
			"category": "Other reports",
			"fields": []
		}
	],
	"inputs": [
		{
			"name": "sebSince",
			"type": "date",
			"label": "SEB join date"
		},
		{
			"name": "sebJoinDate",
			"type": "date",
			"label": "Date (DD/MM/YYYY)",
			"dateStyle": "short"
		},
		{
			"name": "whyApply",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "primaryResponsibility",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "hazardUnderWater",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "theoScenario1",
			"type": "textarea",
			"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team. What is your approach to resolving this situation? (Minimum of 100 words)"
		},
		{
			"name": "theoScenario2",
			"type": "textarea",
			"label": "Strategic Thinking - reasoning"
		},
		{
			"name": "duringADiveOperationYourAssignedPartnerSignalsLowAirAndBeginsShowingSignsOfPanicWhatActionsDoYouTakeMinimumOf100Words",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "theoScenario3",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "whyApplytoAAU",
			"type": "textarea",
			"label": "Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?"
		},
		{
			"name": "responsibilites",
			"type": "textarea",
			"label": "What are the responsibilities of an Advanced Aerial Unit Pilot?"
		},
		{
			"name": "s1q1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "gq1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "gq2",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "gq3",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "ts1",
			"type": "textarea",
			"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team. What is your approach to resolving this situation? (Minimum of 100 words)"
		},
		{
			"name": "ts2",
			"type": "textarea",
			"label": "Strategic Thinking - reasoning"
		},
		{
			"name": "ts3",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "gs1",
			"type": "textarea",
			"label": "Why are you applying for the Advanced Aerial Unit Certification, and how would you be an asset to the Bureau by receiving it?"
		},
		{
			"name": "dgq1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "dgq2",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "dgq3",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "dts1",
			"type": "textarea",
			"label": "A 911 caller reports a person has jumped from a pier and has not resurfaced. Marine units confirm no visual contact. You are deployed as Dive Team. What is your approach to resolving this situation? (Minimum of 100 words)"
		},
		{
			"name": "dts2",
			"type": "textarea",
			"label": "Strategic Thinking - reasoning"
		},
		{
			"name": "dts3",
			"type": "textarea",
			"label": "During a dive operation, your assigned partner signals low air and begins showing signs of panic. What actions do you take? (Minimum of 100 words)"
		},
		{
			"name": "agq1",
			"type": "textarea",
			"label": "Why are you applying for the Dive Team? (Minimum 120 words)"
		},
		{
			"name": "agq3",
			"type": "textarea",
			"label": "What hazards may a diver encounter during underwater operations?"
		},
		{
			"name": "agq2",
			"type": "textarea",
			"label": "What do you believe are the primary responsibilities of a Dive Team operator?"
		},
		{
			"name": "ats1",
			"type": "textarea",
			"label": "SAAA comes in over the department radio, wherein they state that their towers see an aircraft that won't respond to them. How do you approach the aircraft and resolve the situation?"
		},
		{
			"name": "ats2",
			"type": "textarea",
			"label": "You are piloting the 2-D-8 Annihilator Gunship, and you are called to a large-scale gang situation in order to perform an aerial assault with a full team of operators on board, however, your aircraft comes under large-scale direct gunfire from the hostiles mentioned previous. What do you do?"
		},
		{
			"name": "ats3",
			"type": "textarea",
			"label": "During a bank robbery, the suspects take a hostage and in turn negotiate for a helicopter to escape with. Knowing that the individuals on board the helicopter are armed, prone to firing upon law enforcement, and volatile, how do you approach the situation?"
		},
		{
			"name": "egq1",
			"type": "textarea",
			"label": "Why are you applying for EOD, and how would you be an asset by getting the certification?"
		},
		{
			"name": "egq2",
			"type": "textarea",
			"label": "What are the responsibilities of an EOD operator?"
		},
		{
			"name": "egq3",
			"type": "textarea",
			"label": "Do you feel comfortable putting yourself under extreme high risk situations? And are you capable of operating under extreme stress? State few examples or experiences you have faced."
		},
		{
			"name": "ets1",
			"type": "textarea",
			"label": "You have been called to paleto station, where a deputy found on top of the front desk what looked to him as an explosive device of some sort. How would you go by to assess and identify the device? And how would you handle it? Give a detailed explanation, Image attached below of what the device looks like. \n[img]https://i.ibb.co/FbjTZ24J/rx-N9x5n.jpg[/img]"
		},
		{
			"name": "ets2",
			"type": "textarea",
			"label": "You arrive at a hostage situation, where the hostage taker is reported to have an explosive device in his possession, the negociator managed to have the hostage taker agree to give the bomb away. How would you use the equipment available to you to handle the retrieval of the explosive device. Give a detailed explanation of which equipment you use and why."
		},
		{
			"name": "ets3",
			"type": "textarea",
			"label": "During a drug bust, your team stumbles upon a safe door, locked and they are unable to open it. How would you use the equipment available to you to get through the safe door safely."
		},
		{
			"name": "cgq1",
			"type": "textarea",
			"label": "Why are you applying for the Crisis Negotiator Certification? (Minimum 120 words)"
		},
		{
			"name": "cgq2",
			"type": "textarea",
			"label": "Have you ever been in a situation where you had to negotiate a situation?"
		},
		{
			"name": "cgq3",
			"type": "textarea",
			"label": "How would you define negotiation?"
		},
		{
			"name": "cgq4",
			"type": "textarea",
			"label": "What negotiation skills do you believe are crucial for successful outcomes?"
		},
		{
			"name": "cts1",
			"type": "textarea",
			"label": "A group of armed individuals has barricaded themselves in a residential building, holding multiple hostages. Describe the strategic considerations you would make as the assigned negotiator and how you would direct your team to approach this delicate and very dangerous situation."
		},
		{
			"name": "cts2",
			"type": "textarea",
			"label": "A hostage-taker exhibits signs of extreme agitation and is becoming increasingly unpredictable. Outline your communication strategy and how you would manage the evolving threat while ensuring the safety of both hostages and your team. Please be detailed in your response."
		},
		{
			"name": "cts3",
			"type": "textarea",
			"label": "Situation: You are negotiating a hostage situation and the hostage taker is becoming very agitated and is failing to adhere to the previously discussed demands. You have been very open to working with the Hostage Taker to the best of your ability but are beginning to believe that there will not be an easy way to get the hostage to safety. You have a Sniper Certified Operator Available, explain your next course of action and how you would handle the situation from there."
		},
		{
			"name": "lgq1",
			"type": "textarea",
			"label": "How would you be an asset to the Special Enforcement Bureau if you became Long Range Rifle Qualified"
		},
		{
			"name": "lgq2",
			"type": "textarea",
			"label": "Do you feel comfortable making split-second decisions? If so, provide us a detailed description of a scenario where you had to make a split-second decision previously."
		},
		{
			"name": "lgq3",
			"type": "textarea",
			"label": "What motivates you to become certified to use Long Range Rifles? (in depth, at least 1 paragraph)"
		},
		{
			"name": "lts1",
			"type": "textarea",
			"label": "In the following scenario you and your team arrive at the Paleto Bay gas station. When you arrive, you and your team spot a man wielding a pistol, holding a lady at gunpoint. (see illustrative picture below). Behind the man, you see three injured people who have been shot and need immediate medical attention. To be able to tend to them, the man needs to be arrested or taken down. Your team can not get an angle at him from the ground without noticing. He's screaming he will shoot her if any of you comes closer. There are multiple buildings you can go onto. One of the north side, one on the south side, where the team is standing and one of the west side. How would you go about this scenario and how would you take the suspect out without injuring the already injured 10-16's and the hostage."
		},
		{
			"name": "lts2",
			"type": "textarea",
			"label": "On your way to an operation, you find a deputy along the road that just got shot at and you see a car leaving the area. You have two vehicles present. One vehicle will go after the suspect and the other one will treat the deputy. A long pursuit follows and when the suspect is finally brought to a stop, he gets out and aims his weapon and you and your team. However, you only have your service pistol and sniper rifle on you. Would you be allowed to use the sniper rifle? If so, how would you use it? If not, why wouldn't you be allowed to use it?"
		},
		{
			"name": "lts3",
			"type": "textarea",
			"label": "In the following scenario, you are responding to a large shoot-out with multiple injured 10-15's, 10-16's and PD officers. The location is the Legion Square parking lot. To respond quickly, you use the Blackstar to get there as quickly as possible. Shots are still being fired and heavy weapons are involved. Where and how would you deploy? Would you go street level, would you ask to be placed on a rooftop, how would you assess who is a threat and who is not?"
		},
		{
			"name": "FnameLname",
			"type": "text",
			"label": "First Lastname"
		},
		{
			"name": "rideAlongDate",
			"type": "date",
			"label": "Date",
			"dateStyle": "short"
		},
		{
			"name": "startTie",
			"type": "time",
			"label": "Time (UTC)"
		},
		{
			"name": "startTime",
			"type": "time",
			"label": "Time (UTC)"
		},
		{
			"name": "EndTime",
			"type": "time",
			"label": "Time (UTC)"
		},
		{
			"name": "sessionSummary",
			"type": "textarea",
			"label": "Brief Summary of Session"
		},
		{
			"name": "anyProblem",
			"type": "textarea",
			"label": "Did any problems or issues occur?"
		},
		{
			"name": "notesForFurther",
			"type": "textarea",
			"label": "Notes for further ride-along sessions"
		},
		{
			"name": "callSign",
			"type": "text",
			"label": "Your Callsign"
		},
		{
			"name": "vehicleModel",
			"type": "text",
			"label": "Vehicle Model"
		},
		{
			"name": "vehicleColor",
			"type": "text",
			"label": "Vehicle Color"
		},
		{
			"name": "licensePlate",
			"type": "text",
			"label": "License Plate"
		},
		{
			"name": "vehicleOwner",
			"type": "text",
			"label": "Vehicle Owner"
		},
		{
			"name": "miscelleanousDetails",
			"type": "text",
			"label": "Miscelleanous Details"
		},
		{
			"name": "impoundDate",
			"type": "date",
			"label": "Date",
			"dateStyle": "shortYear"
		},
		{
			"name": "impoundTime",
			"type": "time",
			"label": "Impound Time"
		},
		{
			"name": "briefStatementOfImpoundingReason",
			"type": "textarea",
			"label": "Brief Statement of Impounding Reason"
		},
		{
			"name": "deputiesInvolved",
			"type": "textarea",
			"label": "Deputies Involved",
			"hint": "Separate via ,"
		},
		{
			"name": "documentedEvidence",
			"type": "text",
			"label": "Documented Evidence",
			"hint": "Put your img url"
		},
		{
			"name": "impounddate",
			"type": "date",
			"label": "impoundDate"
		},
		{
			"name": "personResponsibleOfImpound",
			"type": "text",
			"label": "Person Responsible of Impound"
		},
		{
			"name": "feesPaidByVehicleOwner",
			"type": "text",
			"label": "Fees Paid by Vehicle Owner"
		},
		{
			"name": "reasonForStop",
			"type": "textarea",
			"label": "Reason for Stop"
		},
		{
			"name": "trafficStopDate",
			"type": "date",
			"label": "Traffic Stop Date"
		},
		{
			"name": "trafficStopTime",
			"type": "time",
			"label": "Traffic Stop Time"
		},
		{
			"name": "trafficStopOutcome",
			"type": "textarea",
			"label": "Traffic Stop Outcome"
		},
		{
			"name": "vehicleDriver",
			"type": "text",
			"label": "Vehicle Driver"
		},
		{
			"name": "vehicelVin",
			"type": "text",
			"label": "Vehicel VIN"
		},
		{
			"name": "occupants",
			"type": "text",
			"label": "Occupants"
		},
		{
			"name": "locationofincident",
			"type": "text",
			"label": "LocationOfIncident"
		},
		{
			"name": "incidentdate",
			"type": "date",
			"label": "Date of incident"
		},
		{
			"name": "incidentTime",
			"type": "time",
			"label": "Incident Time"
		},
		{
			"name": "deputiesStatment",
			"type": "textarea",
			"label": "Deputies Statment"
		},
		{
			"name": "secondaryVehiclesStatement",
			"type": "textarea",
			"label": "Secondary Vehicles Statement"
		},
		{
			"name": "photoOfIncident",
			"type": "text",
			"label": "Photo of incident"
		},
		{
			"name": "suspectDetails",
			"type": "group",
			"label": "Suspects",
			"hint": "One block per suspect — add as many as the arrest needs.",
			"subFields": [
				{
					"name": "fullName",
					"label": "Full Name",
					"type": "text"
				},
				{
					"name": "telephone",
					"label": "Telephone Number",
					"type": "text"
				},
				{
					"name": "licensesRevoked",
					"label": "Licenses Revoked",
					"type": "select",
					"options": [
						{
							"value": "Yes",
							"label": "Yes"
						},
						{
							"value": "No",
							"label": "No"
						}
					]
				},
				{
					"name": "licenses",
					"label": "Licenses (if revoked)",
					"type": "list",
					"placeholder": "Licence — e.g. Class C"
				},
				{
					"name": "charges",
					"label": "Charges",
					"type": "charges"
				},
				{
					"name": "additionalDetails",
					"label": "Additional Details",
					"type": "textarea"
				},
				{
					"name": "mugshot",
					"label": "Mugshot image URL",
					"type": "text"
				}
			],
			"template": "[float=right][b][size=115]MUGSHOT[/size][/b][/float][list=none][b][size=115]SUSPECT {{index}} DETAILS[/size][/b]\n[list=none]\n[float=right][fimg=200,185]{{mugshot}}[/fimg][/float]\n\n[b]Full Name:[/b] {{fullName}}\n[b]Telephone Number:[/b] {{telephone}}\n[b]Licenses Revoked:[/b] {{licensesRevoked}}\n[list]{{licenses}}[/list]\n[b]Charges:[/b]\n[list]{{charges}}[/list]\n[b]Additional Details:[/b] {{additionalDetails}}\n\n[/list]"
		},
		{
			"name": "arrestVehicles",
			"type": "group",
			"label": "Vehicles Involved",
			"hint": "Colour, model, plate, VIN and registered owner — one entry per vehicle.",
			"subFields": [
				{
					"name": "color",
					"label": "Colour",
					"type": "text"
				},
				{
					"name": "model",
					"label": "Model",
					"type": "text"
				},
				{
					"name": "lp",
					"label": "Licence plate",
					"type": "text"
				},
				{
					"name": "vin",
					"label": "VIN",
					"type": "text"
				},
				{
					"name": "ro",
					"label": "Registered owner",
					"type": "text"
				}
			],
			"template": "Vehicle {{letter}}: {{color}}, {{model}}, LP {{lp}}, VIN {{vin}}, RO {{ro}}"
		},
		{
			"name": "evidenceItems",
			"type": "group",
			"label": "Evidence Exhibits",
			"hint": "Each entry prints as another exhibit, lettered in order.",
			"subFields": [
				{
					"name": "details",
					"label": "Exhibit details",
					"type": "textarea"
				}
			],
			"template": "[b]Exhibit {{letter}}:[/b] {{details}}"
		},
		{
			"name": "evidenceLocker",
			"type": "select",
			"label": "Location of Evidence Locker",
			"hint": "Where the evidence is being held.",
			"options": [
				{
					"value": "N/A",
					"label": "N/A"
				},
				{
					"value": "Sandy Station",
					"label": "Sandy Station"
				},
				{
					"value": "Paleto Station",
					"label": "Paleto Station"
				},
				{
					"value": "Mission Row",
					"label": "Mission Row"
				}
			]
		},
		{
			"name": "evidencePhoto",
			"type": "text",
			"label": "Photo of the evidence in the locker (URL)",
			"hint": "Optional image link, shown in the report's spoiler."
		},
		{
			"name": "arrestNarrative",
			"type": "textarea",
			"label": "Provide details of the incident leading up to the arrest."
		},
		{
			"name": "warrantSuspects",
			"type": "group",
			"label": "Suspects",
			"hint": "One numbered block per suspect.",
			"subFields": [
				{
					"name": "fullName",
					"label": "Full Name",
					"type": "text"
				},
				{
					"name": "telephone",
					"label": "Telephone Number",
					"type": "text"
				},
				{
					"name": "charges",
					"label": "Charges",
					"type": "charges"
				},
				{
					"name": "additionalDetails",
					"label": "Additional Details (suspect's vehicle, etc.)",
					"type": "textarea"
				}
			],
			"template": "[b][size=115]SUSPECT {{index}} DETAILS[/size][/b]\n[list=none]\n\n[b]Full Name:[/b] {{fullName}}\n[b]Telephone Number:[/b] {{telephone}}\n[b]Charges:[/b]\n[list]{{charges}}[/list]\n[b]Additional Details (Suspect's vehicle, etc.) :[/b] {{additionalDetails}}\n\n[/list]"
		},
		{
			"name": "warrantVehicles",
			"type": "group",
			"label": "Vehicles Involved",
			"hint": "One entry per vehicle, lettered in order.",
			"subFields": [
				{
					"name": "color",
					"label": "Colour",
					"type": "text"
				},
				{
					"name": "model",
					"label": "Model",
					"type": "text"
				},
				{
					"name": "lp",
					"label": "Licence plate",
					"type": "text"
				},
				{
					"name": "ro",
					"label": "Registered owner",
					"type": "text"
				}
			],
			"template": "[b]Vehicle {{letter}}:[/b] {{color}}, {{model}}, LP {{lp}}, RO {{ro}}"
		},
		{
			"name": "warrantNarrative",
			"type": "textarea",
			"label": "Explain what happened — sufficient detail to justify the placed charges"
		},
		{
			"name": "methodOfIdentification",
			"type": "textarea",
			"label": "Method of Identification"
		},
		{
			"name": "confiscatedEvidence",
			"type": "group",
			"label": "Confiscated Evidence Exhibits",
			"hint": "One entry per item seized, lettered in order.",
			"subFields": [
				{
					"name": "item",
					"label": "Item",
					"type": "textarea"
				}
			],
			"template": "[b]Exhibit {{letter}}:[/b] {{item}}"
		},
		{
			"name": "drivingCode",
			"type": "checkbox",
			"label": "Driving Code",
			"items": [
				"Code 4 (no lights or sirens)",
				"Code 2 (lights)",
				"Code 3 (Lights, Sirens, Mid pursuit)"
			]
		},
		{
			"name": "injuries",
			"type": "checkbox",
			"label": "Injuries Sustained",
			"items": [
				"None",
				"Civilian",
				"Deputy",
				"Deputy and Civilian"
			]
		},
		{
			"name": "vehicleDamage",
			"type": "checkbox",
			"label": "Damage to Department Vehicle",
			"items": [
				"Minor",
				"Moderate",
				"Severe",
				"Totaled (required tow)",
				"Destroyed"
			]
		},
		{
			"name": "secondaryDamage",
			"type": "checkbox",
			"label": "Damage to Secondary Vehicle",
			"items": [
				"Minor",
				"Moderate",
				"Severe",
				"Totaled (required tow)",
				"Destroyed"
			]
		},
		{
			"name": "groupOne",
			"type": "list",
			"label": "Group One — names",
			"itemPlaceholder": "Name or organisation, then press Enter"
		},
		{
			"name": "groupTwo",
			"type": "list",
			"label": "Group Two — names",
			"itemPlaceholder": "Name or organisation, then press Enter"
		},
		{
			"name": "incidentSummary",
			"type": "textarea",
			"label": "Summary of the Incident"
		},
		{
			"name": "incidentWitnesses",
			"type": "text",
			"label": "Incident Witnesses"
		},
		{
			"name": "photosTaken",
			"type": "images",
			"label": "Photos Taken"
		},
		{
			"name": "bodycameraEvidence",
			"type": "text",
			"label": "Bodycamera Evidence"
		},
		{
			"name": "suspectName",
			"type": "text",
			"label": "Suspect Name"
		},
		{
			"name": "shiftSupervisor",
			"type": "text",
			"label": "Shift/Scene Supervisor"
		},
		{
			"name": "licenseHolder",
			"type": "text",
			"label": "Full name of the individual"
		},
		{
			"name": "demeritsBefore",
			"type": "number",
			"label": "Total demerits applied before unsuspension"
		},
		{
			"name": "demeritsAfter",
			"type": "number",
			"label": "Total demerits re-applied after unsuspension"
		},
		{
			"name": "unsuspensionReason",
			"type": "textarea",
			"label": "Reason for unsuspending the license"
		},
		{
			"name": "evidenceRecipient",
			"type": "text",
			"label": "Full name of the recipient"
		},
		{
			"name": "releasedItems",
			"type": "list",
			"label": "Released items",
			"itemPlaceholder": "Item, then press Enter — e.g. One 9mm pistol"
		},
		{
			"name": "citationRecipient",
			"type": "text",
			"label": "Full name"
		},
		{
			"name": "citationPhone",
			"type": "text",
			"label": "Phone number"
		},
		{
			"name": "citationsIssued",
			"type": "list",
			"label": "Citation(s) issued",
			"itemPlaceholder": "Citation, then press Enter — e.g. VC01 - Speeding 1st Degree"
		},
		{
			"name": "citationReason",
			"type": "textarea",
			"label": "Reason"
		},
		{
			"name": "additionalInformation",
			"type": "list",
			"label": "Additional information",
			"itemPlaceholder": "Detail, then press Enter"
		},
		{
			"name": "patrolDate",
			"type": "date",
			"label": "Date"
		},
		{
			"name": "patrolHours",
			"type": "number",
			"label": "Hours on duty"
		},
		{
			"name": "startOfWatch",
			"type": "time",
			"label": "Start of watch (GMT)"
		},
		{
			"name": "patrolArrests",
			"type": "number",
			"label": "Arrests"
		},
		{
			"name": "patrolCitations",
			"type": "number",
			"label": "Citations"
		},
		{
			"name": "patrolNotes",
			"type": "textarea",
			"label": "Notes (optional)"
		},
		{
			"name": "incidentDate",
			"type": "date",
			"label": "Incident Date"
		},
		{
			"name": "potentiallyLinkedOrganizationsToGraffiti",
			"type": "text",
			"label": "Potentially Linked Organizations to Graffiti",
			"hint": "Gang/Party"
		},
		{
			"name": "incidentImages",
			"type": "images",
			"label": "Incident Images"
		},
		{
			"name": "AdditionalNotes",
			"type": "textarea",
			"label": "Additional Notes"
		},
		{
			"name": "test",
			"type": "checkbox",
			"label": "test"
		},
		{
			"name": "forceType",
			"type": "checkbox",
			"label": "test",
			"items": [
				"Restraint",
				"Incapacitating",
				"Lethal"
			]
		},
		{
			"name": "perceptionOfSuspectsActions",
			"type": "checkbox",
			"label": "Perception of Suspects Actions",
			"items": [
				"Active/Escape Resistance",
				"Assaultive/High Risk",
				"Life Threatening"
			]
		},
		{
			"name": "policeEquipmentUsedOnSuspect",
			"type": "checkbox",
			"label": "Police Equipment Used on Suspect",
			"items": [
				"Handcuffs",
				"Baton",
				"Taser",
				"Firearm (Specify)",
				"Other (Specify)"
			]
		},
		{
			"name": "outcomeOfForce",
			"type": "checkbox",
			"label": "Outcome of Force",
			"items": [
				"Release",
				"Imprisonment",
				"Hospitalisation",
				"Escape",
				"Death"
			]
		},
		{
			"name": "trainingDescription",
			"type": "textarea",
			"label": "Training Description"
		}
	]
} /* /ADMIN_DATA */;
