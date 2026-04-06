// Package updater checks for and applies application updates via GitHub Releases.
package updater

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// UpdateInfo describes an available update.
type UpdateInfo struct {
	Version      string `json:"version"`
	URL          string `json:"url"`
	ReleaseNotes string `json:"releaseNotes"`
}

// Updater checks GitHub Releases for new versions and applies them.
type Updater struct {
	currentVersion string
	repoOwner      string
	repoName       string
	httpClient     *http.Client
}

// NewUpdater creates an Updater for the given GitHub repository.
func NewUpdater(currentVersion, owner, repo string) *Updater {
	return &Updater{
		currentVersion: currentVersion,
		repoOwner:      owner,
		repoName:       repo,
		httpClient:     &http.Client{Timeout: 10 * time.Second},
	}
}

// githubRelease is a minimal representation of a GitHub release response.
type githubRelease struct {
	TagName string `json:"tag_name"`
	HTMLURL string `json:"html_url"`
	Body    string `json:"body"`
}

// CheckForUpdate queries the GitHub Releases API for the latest release and
// returns UpdateInfo if a newer version is available.
func (u *Updater) CheckForUpdate() (*UpdateInfo, error) {
	url := fmt.Sprintf(
		"https://api.github.com/repos/%s/%s/releases/latest",
		u.repoOwner, u.repoName,
	)
	resp, err := u.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("check update: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("github API returned status %d", resp.StatusCode)
	}

	var rel githubRelease
	if err := json.NewDecoder(resp.Body).Decode(&rel); err != nil {
		return nil, fmt.Errorf("decode release: %w", err)
	}

	if rel.TagName == u.currentVersion {
		return nil, nil // already up to date
	}

	return &UpdateInfo{
		Version:      rel.TagName,
		URL:          rel.HTMLURL,
		ReleaseNotes: rel.Body,
	}, nil
}

// Apply downloads and installs the update described by info.
// This is a stub; a real implementation would use the go-update pattern to
// replace the running binary.
func (u *Updater) Apply(info *UpdateInfo) error {
	// TODO: Download asset from info.URL and replace current binary.
	return fmt.Errorf("auto-update not yet implemented")
}
